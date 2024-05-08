import React from "react";
import { Box } from "@mui/system";
import Button from "@mui/joy/Button";
import { Link as RouterLink } from "react-router-dom";

const PainelAdmin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "5", // Definindo a altura mínima para toda a altura da janela
      }}
    >
      <Button component={RouterLink} to="/painel-admin">
        Painel Admin
      </Button>
    </Box>
  );
};

export default PainelAdmin;
