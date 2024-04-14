import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./contextAPI/Auth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Tasks from "./components/Task";
import { validateToken } from "./handlers.js/authHandle";
import { useToast } from "./contextAPI/ToastProvider";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;
export const baseAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

function App() {
  const { isLoggedIn, login, logout } = useAuth();
  const { handletoast } = useToast();
  const [logComp, setLogComp] = useState("login");
  const [serverOnline, setServerOnline] = useState(false);

  useEffect(() => {
    // // check api is working
    const checkApi = async () => {
      try {
        const res = await baseAPI.get("/check");
        if (res.status === 200) {
          setServerOnline(true);
          validateToken(login, logout);
        } else {
          setServerOnline(false);
          handletoast({
            type: "error",
            message: "Server is Offline, please try again",
          });
        }
      } catch (error) {
        console.log(error);
        setServerOnline(false);
        handletoast({
          type: "error",
          message: "Api is not working",
        });
      }
    };
    checkApi();
  }, []);

  const AuthComp = {
    login: (
      <Login
        setLogComp={setLogComp}
        login={login}
        serverOnline={serverOnline}
      />
    ),
    register: <Register setLogComp={setLogComp} serverOnline={serverOnline} />,
  };

  const comp = isLoggedIn ? <Tasks /> : AuthComp[logComp];

  return <>{comp}</>;
}

export default App;
