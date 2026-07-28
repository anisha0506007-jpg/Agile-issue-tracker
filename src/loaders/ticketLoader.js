import { getTickets } from "../services/ticketServices";

export async function ticketLoader() {
  return getTickets();
}