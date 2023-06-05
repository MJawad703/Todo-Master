import axios from "axios";

const boardApi = axios.create({
  baseURL: "http://localhost:3001",
});

export const getAllUserBoards = async ({ userId, token }) => {
  const response = await boardApi.get(`user/${userId}/boards`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createUserBoard = async ({
  userId,
  title,
  description,
  token,
}) => {
  await boardApi.post(
    `user/${userId}/boards`,
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteUserBoard = async ({ userId, _boardId, token }) =>
  await boardApi.delete(`user/${userId}/boards/${_boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateUserBoard = async ({
  title,
  description,
  _boardId,
  token,
}) =>
  await boardApi.put(
    `/user/boards/${_boardId}`,
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
