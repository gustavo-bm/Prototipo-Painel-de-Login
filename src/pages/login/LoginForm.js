import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/joy/Link";

import SocialLoginButton from "./SocialLoginButton";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

const LoginForm = ({ handleSignIn, setEmail, setPassword }) => {
  const signInWithFacebook = () => {
    // Código signInWithFacebook aqui
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
      });
  };

  const signInWithGoogle = () => {
    // Código signInWithGoogle aqui
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
  };

  return (
    <Sheet
      sx={{
        width: 300,
        mx: "auto",
        my: 4,
        py: 3,
        px: 2,
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

      <SocialLoginButton onClick={signInWithGoogle} provider="Google" />
      <SocialLoginButton onClick={signInWithFacebook} provider="Facebook" />

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
    </Sheet>
  );
};

export default LoginForm;
