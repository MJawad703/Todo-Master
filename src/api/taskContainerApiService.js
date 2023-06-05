import axios from "axios";

const taskContainerApi = axios.create({
  baseURL: "http://localhost:3001/board",
});

export const getAllBoardTaskContainers = async ({ _boardId }) => {
  const response = await taskContainerApi.get(`/${_boardId}/task-containers`);
  return response.data;
};

export const createBoardTaskContainer = async ({
  title,
  description,
  _boardId,
}) =>
  await taskContainerApi.post(`/${_boardId}/task-containers`, {
    title,
    description,
  });
