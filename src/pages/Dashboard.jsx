import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../services/ticketServices";


function Dashboard() {
  const initialTickets = useLoaderData();

  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    initialData: initialTickets,
  });

  const todoTickets = tickets.filter(
    (ticket) => ticket.status === "todo"
  );

  const progressTickets = tickets.filter(
    (ticket) => ticket.status === "progress"
  );

  const doneTickets = tickets.filter(
    (ticket) => ticket.status === "done"
  );

  return (
    <div className="dashboard">
      <h1 className="board-title">Agile Issue Tracker</h1>

      <div className="board">
        <div className="column">
          <h2>To Do ({todoTickets.length})</h2>

          {todoTickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>

              <div className="ticket-info">
                <span>👤 {ticket.assignee}</span>
                <span>⚡ {ticket.priority}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>In Progress ({progressTickets.length})</h2>

          {progressTickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>

              <div className="ticket-info">
                <span>👤 {ticket.assignee}</span>
                <span>⚡ {ticket.priority}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Done ({doneTickets.length})</h2>

          {doneTickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>

              <div className="ticket-info">
                <span>👤 {ticket.assignee}</span>
                <span>⚡ {ticket.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;