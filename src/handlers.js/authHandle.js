import { baseAPI } from "../App";

export const validateToken = async (login, logout) => {
  try {
    // Make a request to your backend server to validate the refresh token
    // Handle refresh token validation
    const data = await baseAPI.get("/auth/refresh");
    if (data.status === 200) {
      login();
      localStorage.setItem("token", data?.data?.accessToken);
    }
  } catch (error) {
    logout();
    console.error("Error validating refresh token:", error);
  }
};

export const hangleLogout = async () => {
  try {
    localStorage.removeItem("token");
    const { data } = await baseAPI.get("/auth/signout");
    if (data.status === "success") {
      window.location.reload();
    } else {
      console.error("Error removing token:", data);
    }
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
