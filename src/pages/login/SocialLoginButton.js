import React from "react";
import Button from "@mui/joy/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const SocialLoginButton = ({ onClick, provider }) => {
  return (
    <Button
      sx={{
        mt: 1,
        backgroundColor: provider === "Google" ? "#DB4437" : "#4267B2",
        "&:hover": {
          backgroundColor: provider === "Google" ? "#d63031" : "#385898",
        },
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      {provider === "Google" ? (
        <GoogleIcon style={{ marginRight: "25px" }} />
      ) : (
        <FacebookIcon style={{ marginRight: "15px" }} />
      )}
      Continue com {provider}
    </Button>
  );
};

export default SocialLoginButton;
