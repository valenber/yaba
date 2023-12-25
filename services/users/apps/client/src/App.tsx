import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [welcome, setWelcome] = useState("Hey there!");

  useEffect(() => {
    const baseApiUrl =
      process.env.NODE_ENV === "production" ? "/users/api" : "/api";

    fetch(baseApiUrl)
      .then((res) => res.text())
      .then(setWelcome);
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{welcome}</h1>
    </>
  );
}

export default App;
