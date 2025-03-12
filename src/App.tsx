import React from "react";
import { Home } from "./pages/Home";
import { setupDB } from "./services/database";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  setupDB();

  return (
    <>
      <Home />
      <ToastContainer />
    </>
  );
}

export default App;
