import axios from "../setup/axios";

const registerNewUser = (data) => {
  return axios.post("/api/v1/register", data);
};
const loginUser = (data) => {
  return axios.post("/api/v1/login", data);
};
const getAllUser = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};
const deleteUser = (id) => {
  return axios.delete("/api/v1/user/delete", {
    data: { id },
  });
};
const getAllGroup = () => {
  return axios.get("/api/v1/group/read");
};
const createNewUser = (data) => {
  return axios.post("/api/v1/user/create", { ...data });
};
const updateUser = (data) => {
  return axios.put("/api/v1/user/update", { ...data });
};
const getUserAccount = () => {
  return axios.get("/api/v1/account");
};
const logout = () => {
  return axios.post("/api/v1/logout");
};
const createRoles = (data) => {
  return axios.post("/api/v1/role/create", data);
};
const updateRole = (data) => {
  return axios.put("/api/v1/role/update", { ...data });
};
export {
  registerNewUser,
  loginUser,
  getAllUser,
  deleteUser,
  getAllGroup,
  createNewUser,
  updateUser,
  getUserAccount,
  logout,
  createRoles,
};
