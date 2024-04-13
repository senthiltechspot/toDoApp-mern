import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;
export const baseAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // check api is working
    const checkApi = async () => {
      try {
        const res = await baseAPI.get("/check");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    checkApi();
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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
