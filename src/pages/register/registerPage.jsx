import React from "react";
import { CssVarsProvider } from "@mui/joy";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
  return (
    <CssVarsProvider>
      <div>
        <RegisterForm />
      </div>
    </CssVarsProvider>
  );
}

export default RegisterPage;