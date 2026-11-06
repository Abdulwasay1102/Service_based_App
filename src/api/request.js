import API, { authHeader } from "./axios";

export const createRequest = (formData) =>
  API.post("/requests", formData, authHeader());
export const getMyRequests = () => API.get("/requests/my", authHeader());
export const getRequest = (id) => API.get(`/requests/${id}`, authHeader());
export const updateRequest = (id, data) =>
  API.put(`/requests/${id}`, data, authHeader());
export const deleteRequest = (id) =>
  API.delete(`/requests/${id}`, authHeader());
export const getAllRequests = () => API.get("/requests/all", authHeader());
export const updateStatus = (id, status) =>
  API.patch(`/requests/${id}/status`, { status }, authHeader());
