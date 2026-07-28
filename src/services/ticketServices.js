import api from "../api/api";

export const getTickets = async () => {
  const { data } = await api.get("/tickets");
  return data;
};

export const createTicket = async (ticket) => {
  const { data } = await api.post("/tickets", ticket);
  return data;
};

export const updateTicket = async (ticket) => {
  const { data } = await api.put(`/tickets/${ticket.id}`, ticket);
  return data;
};