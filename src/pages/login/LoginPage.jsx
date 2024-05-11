import React, { useState } from "react";
import LoginForm from "./LoginForm";
import ErrorMessage from "./ErrorMessage";
import { CssVarsProvider } from "@mui/joy/styles";

import { auth } from "../../services/firebaseConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import PainelAdmin from "./PainelAdminButton";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  return (
    <div>
      <CssVarsProvider>
        <ErrorMessage message={error} />
        {loading && <p>Carregando...</p>}
        <LoginForm
          handleSignIn={handleSignIn}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <PainelAdmin />
      </CssVarsProvider>
    </div>
  );
}

export default LoginPage;
