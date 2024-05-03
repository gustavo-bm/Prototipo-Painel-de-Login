import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import "../../App.css";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
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

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(email, password);

      // Após a criação da conta com sucesso, redireciona para a página de login
      navigate("/"); // Redireciona para a rota de login (página inicial)
    } catch (error) {
      console.error("Erro ao criar conta:", error.message);
      // Trate o erro aqui, se necessário
    }
  }

  if (loading) {
    return <p>carregando...</p>;
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
              Crie sua conta
            </Typography>
            <Typography level="body-sm">
              Forneça um e-mail válido e uma senha forte.
            </Typography>
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
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button sx={{ mt: 1 /* margin top */ }} onClick={handleSignUp}>
            Criar conta
          </Button>
        </Sheet>
      </div>
    </CssVarsProvider>
  );
}
