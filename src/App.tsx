import React, { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { setupDB } from "./services/database";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  useEffect(() => {
    const initializeDB = async () => {
      await setupDB();
      setIsDBReady(true);
    };

    initializeDB();
  }, []);

  if (!isDBReady) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Home />
      <ToastContainer />
    </>
  );
}

export default App;
