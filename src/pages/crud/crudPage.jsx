import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/joy/MenuItem";
import Link from "@mui/joy/Link";
import { Link as RouterLink } from "react-router-dom";

export default function Painel() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Alinha os itens ao centro horizontalmente
        marginTop: "100px",
        gap: "20px", // Espaçamento entre os itens
      }}
    >
      <Link component={RouterLink} to="/register">
        Cadastrar
      </Link>

      <Button>Atualizar</Button>
      <Button>Visualizar</Button>
      <Button>Excluir</Button>
    </div>
  );
}
