import { baseAPI } from "../App";

export async function loginAPI(values) {
  try {
    const data = await baseAPI.post("/auth/login", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error.response.data.message || error;
  }
}

export async function signupAPI(values) {
  try {
    const data = await baseAPI.post("/auth/register", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error.response.data.message || error;
  }
}
