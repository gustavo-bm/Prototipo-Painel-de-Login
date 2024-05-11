// import React, { useState } from "react";
// import Button from "@mui/joy/Button";
// import { useColorScheme, CssVarsProvider } from "@mui/joy/styles";

// const ModeToggle = () => {
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = useState(false);

//   const toggleMode = () => {
//     const newMode = mode === "light" ? "dark" : "light";
//     setMode(newMode);

//     document.documentElement.style.setProperty(
//       "--background-color",
//       newMode === "light" ? "#fff" : "#333"
//     );
//     document.documentElement.style.setProperty(
//       "--text-color",
//       newMode === "light" ? "#000" : "#fff"
//     );
//   };

//   return (
//     <Button variant="outlined" onClick={toggleMode}>
//       {mode === "light" ? "Modo Escuro" : "Modo Claro"}
//     </Button>
//   );
// };

// const ModeToggleWithProvider = () => {
//   return (
//     <CssVarsProvider>
//       <ModeToggle />
//     </CssVarsProvider>
//   );
// };

// export default ModeToggleWithProvider;
