import axios from "../setup/axios";

const getAllRole = () => {
  return axios.get("/api/v1/role/read");
};
const createRoles = (data) => {
  return axios.post("/api/v1/role/create", data);
};
const updateRole = (data) => {
  return axios.put("/api/v1/role/update", { ...data });
};
const deleteRole = (id) => {
  return axios.delete("/api/v1/role/delete", {
    data: { id },
  });
};
const getRoleByGroup = (groupId) => {
  return axios.get(`/api/v1/role/by-group/${groupId}`);
};
const assignRoleToGroup = (data) => {
  return axios.post("/api/v1/role/assign-to-group", data);
};
export {
  updateRole,
  createRoles,
  deleteRole,
  getAllRole,
  getRoleByGroup,
  assignRoleToGroup,
};
