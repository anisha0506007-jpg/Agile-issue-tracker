import api from "../api/api";

export const getTickets = async () => {
  const response = await api.get("/tickets");
  return response.data;
};