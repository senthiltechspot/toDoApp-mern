import { baseAPI } from "../App";

export async function getTaskAPI() {
  try {
    const { data } = await baseAPI.get("/task", {
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

export async function createTaskAPI(values) {
  try {
    const data = await baseAPI.post("/task", values, {
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

export async function updateTaskAPI(values) {
  try {
    const data = await baseAPI.put(`/task/${values.id}`, values, {
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

export async function deleteTaskAPI(values) {
  try {
    const data = await baseAPI.delete(`/task/${values.id}`, {
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
