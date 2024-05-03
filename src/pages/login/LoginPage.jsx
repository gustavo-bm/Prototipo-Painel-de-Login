import * as React from "react";
import { useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import { auth } from "../../services/firebaseConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/joy/Link";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import "../../App.css";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);

    // Atualize as variáveis CSS globais com base no novo modo
    document.documentElement.style.setProperty(
      "--background-color",
      newMode === "light" ? "#fff" : "#333" // Exemplo: altere as cores de fundo
    );
    document.documentElement.style.setProperty(
      "--text-color",
      newMode === "light" ? "#000" : "#fff" // Exemplo: altere as cores do texto
    );
  };

  return (
    <Button variant="outlined" onClick={toggleMode}>
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    const auth_facebook = getAuth();
    signInWithPopup(auth_facebook, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // Lógica de sucesso - pode adicionar ações adicionais aqui se necessário
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email; // Verifique se o email está disponível

        // Exibir mensagens de erro com base no código de erro
        switch (errorCode) {
          case "auth/popup-closed-by-user":
            showErrorMessage("Login cancelado pelo usuário");
            break;
          case "auth/account-exists-with-different-credential":
            showErrorMessage(
              "Já existe uma conta com este e-mail, use outro método de login"
            );
            break;
          default:
            showErrorMessage(
              "Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde"
            );
        }
      });
  }

  // Função para exibir mensagem temporária em vermelho no topo da página
  function showErrorMessage(message) {
    const errorContainer = document.getElementById("error-container");

    // Verifica se o elemento errorContainer foi encontrado no DOM
    if (errorContainer) {
      // Criar um elemento para exibir a mensagem de erro
      const errorMessageElement = document.createElement("p");
      errorMessageElement.textContent = message;
      errorMessageElement.style.color = "red";
      errorMessageElement.style.fontWeight = "bold";

      // Limpar o conteúdo anterior e adicionar a nova mensagem de erro
      errorContainer.innerHTML = ""; // Limpa conteúdo anterior
      errorContainer.appendChild(errorMessageElement);

      // Limpar a mensagem após alguns segundos (opcional)
      setTimeout(() => {
        errorContainer.innerHTML = ""; // Limpa a mensagem após 5 segundos
      }, 5000); // Limpa após 5 segundos
    } else {
      console.error("Elemento #error-container não encontrado.");
    }
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  if (loading) {
    return <p>carregando...</p>;
  }
  if (user) {
    return console.log(user);
  }
  return (
    <CssVarsProvider>
      <ModeToggle />
      <div>
        <Sheet
          sx={{
            width: 300,
            mx: "auto", // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
        >
          <div>
            <Typography level="h4" component="h1">
              Seja bem-vindo!
            </Typography>
            <Typography level="body-sm">Faça login para continuar.</Typography>
          </div>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={handleSignIn}>
            Faça login
          </Button>
          <Typography
            endDecorator={
              <Link component={RouterLink} to="/register">
                Crie sua conta
              </Link>
            }
            fontSize="sm"
            sx={{ alignSelf: "center" }}
            display={"inline-block"}
          >
            Não tem uma conta?
          </Typography>
          <Button
            sx={{
              mt: 1,
              backgroundColor: "#DB4437",
              "&:hover": {
                backgroundColor: "#d63031",
              },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={signInWithGoogle}
          >
            <GoogleIcon style={{ marginRight: "25px" }} />
            Continue com Google
          </Button>
          <Button
            sx={{
              mt: 1,
              backgroundColor: "#4267B2",
              "&:hover": {
                backgroundColor: "#385898",
              },
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={signInWithFacebook} // Aqui está a chamada correta
          >
            <FacebookIcon style={{ marginRight: "15px" }} />
            Continue com Facebook
          </Button>
          <Button>
              <Link color="primary" underline="none" component={RouterLink} to="/painel-admin">
                Painel Admin
              </Link>
          </Button>
        </Sheet>
      </div>
    </CssVarsProvider>
  );
}
