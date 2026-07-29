import api from "../api/api";

export const getTickets = async () => {
  const response = await api.get("/tickets");
  return response.data;
};

export const createTicket = async (ticket) => {
  const response = await api.post("/tickets", ticket);
  return response.data;
};

export const updateTicket = async (ticket) => {
  const response = await api.put(`/tickets/${ticket.id}`, ticket);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};