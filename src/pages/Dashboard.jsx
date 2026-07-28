import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getTickets } from "../services/ticketServices";

import Board from "../components/Board";
import TicketModal from "../components/TicketModal";

function Dashboard() {

  const initialData = useLoaderData();

  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    initialData,
  });

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  return (
    <>
      <div className="dashboard-header">

        <h1>Agile Issue Tracker</h1>

        <Link to="/create-ticket">
          <button>+ New Ticket</button>
        </Link>

      </div>

      <Board
        tickets={tickets}
        onTicketClick={setSelectedTicket}
      />

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() =>
            setSelectedTicket(null)
          }
        />
      )}
    </>
  );
}

export default Dashboard;