import { axiosClient } from "./axiosClient";

export const getProfile = async () =>
  (await axiosClient.get("/users/me")).data;

export const getUsers = async () => (await axiosClient.get("/users")).data;

export const getUser = async (id: string) =>
  (await axiosClient.get(`/users/${id}`)).data;
