import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./contextAPI/Auth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Tasks from "./components/Task";
import { validateToken } from "./handlers.js/authHandle";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;
export const baseAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

function App() {
  const { isLoggedIn, login, logout } = useAuth();

  const [logComp, setLogComp] = useState("login");
  const [serverOnline, setServerOnline] = useState(false);
  useEffect(() => {
    // // check api is working
    const checkApi = async () => {
      try {
        const res = await baseAPI.get("/check");
        if (res.status === 200) {
          setServerOnline(true);
        } else {
          setServerOnline(false);
        }
      } catch (error) {
        console.log(error);
        setServerOnline(false);
      }
    };
    checkApi();

    validateToken(login, logout);
  }, []);

  const AuthComp = {
    login: <Login setLogComp={setLogComp} login={login} serverOnline={serverOnline} />,
    register: <Register setLogComp={setLogComp} serverOnline={serverOnline} />,
  };

  const comp = isLoggedIn ? <Tasks /> : AuthComp[logComp];

  return <>{comp}</>;
}

export default App;
