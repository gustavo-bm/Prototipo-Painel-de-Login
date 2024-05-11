import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import CredentialSelect from "../../components/CredentialSelect";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar conta: ", error.message);
    }
  }

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
          Crie sua conta
        </Typography>
        <Typography level="body-sm">
          Forneça um e-mail válido e uma senha forte.
        </Typography>
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

      <CredentialSelect />

      <Button sx={{ mt: 1 }} onClick={handleSignUp}>
        Criar conta
      </Button>
    </Sheet>
  );
}

export default RegisterForm;