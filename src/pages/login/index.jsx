import * as React from "react";
import { useState } from "react";

import { auth } from "../../services/firebaseConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/joy/Link";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";

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

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
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

  if (loading) {
    return <p>carregando...</p>;
  }
  if (user) {
    return console.log(user);
  }
  return (
    <CssVarsProvider>
      <ModeToggle />
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
            onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button sx={{ mt: 1 /* margin top */ } } onClick={handleSignIn}>Faça login</Button>
        <Typography
          endDecorator={
            <Link component={RouterLink} to="/register">
              Crie sua conta!
            </Link>
          }
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Não tem uma conta?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
