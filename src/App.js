import React from "react";
import MacroDietApp from "./MacroDietApp";

function App() {
  return <MacroDietApp />;
}

export default App;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.log('Error al registrar Service Worker:', error);
      });
  });
}
