import { useState } from "react";
import { MenuItem, Select, FormControl, FormLabel } from "@mui/joy";

export default function CredentialSelect() {
  const [credential, setCredential] = useState("");

  const handleChange = (e) => {
    setCredential(e);
  };

  return (
    <FormControl>
      <FormLabel>Tipo de Usuário</FormLabel>
      <Select value={credential} onChange={handleChange}>
        <MenuItem value="">Selecione o tipo de usuário</MenuItem>
        <MenuItem value="Aluno">Aluno</MenuItem>
        <MenuItem value="Professor">Professor</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
      </Select>
    </FormControl>
  );
}
