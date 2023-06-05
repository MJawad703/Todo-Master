import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:3001/task-container",
});

export const createTask = async ({ title, description, _taskContainerId }) => {
  await taskApi.post(`/${_taskContainerId}/tasks`, {
    title,
    description,
  });
};
