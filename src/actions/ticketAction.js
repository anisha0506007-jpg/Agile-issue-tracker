import { redirect } from "react-router-dom";
import { createTicket } from "../services/ticketServices";

export async function ticketAction({ request }) {
  const formData = await request.formData();

  const newTicket = {
    title: formData.get("title"),
    description: formData.get("description"),
    assignee: formData.get("assignee"),
    priority: formData.get("priority"),
    status: "todo",
  };

  await createTicket(newTicket);

  return redirect("/");
}