import React, { useEffect } from "react";

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    const errorContainer = document.getElementById("error-container");

    if (errorContainer) {
      const errorMessageElement = document.createElement("p");
      errorMessageElement.textContent = message;
      errorMessageElement.style.color = "red";
      errorMessageElement.style.fontWeight = "bold";

      errorContainer.innerHTML = "";
      errorContainer.appendChild(errorMessageElement);

      setTimeout(() => {
        errorContainer.innerHTML = "";
      }, 5000);
    } else {
      console.error("Elemento #error-container não encontrado.");
    }
  }, [message]);

  return <div id="error-container"></div>;
};

export default ErrorMessage;
