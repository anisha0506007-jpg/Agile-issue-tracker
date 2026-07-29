import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getTickets, updateTicket } from "../services/ticketServices";

import Board from "../components/Board";
import TicketModal from "../components/TicketModal";


function Dashboard() {
  const queryClient = useQueryClient();

  const initialTickets = useLoaderData();

  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    initialData: initialTickets,
  });

  const [selectedTicket, setSelectedTicket] = useState(null);

  const mutation = useMutation({
    mutationFn: updateTicket,

    onMutate: async (updatedTicket) => {
      await queryClient.cancelQueries({
        queryKey: ["tickets"],
      });

      const previousTickets =
        queryClient.getQueryData(["tickets"]);

      queryClient.setQueryData(
        ["tickets"],
        (oldTickets = []) =>
          oldTickets.map((ticket) =>
            ticket.id === updatedTicket.id
              ? updatedTicket
              : ticket
          )
      );

      return { previousTickets };
    },

    onError: (error, updatedTicket, context) => {
      queryClient.setQueryData(
        ["tickets"],
        context.previousTickets
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },
  });

  const handleMove = (ticket, newStatus) => {
    mutation.mutate({
      ...ticket,
      status: newStatus,
    });
  };

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <h1>Agile Issue Tracker</h1>

        <Link to="/create-ticket">
          <button className="new-ticket-btn">
            + New Ticket
          </button>
        </Link>

      </div>

      <Board
        tickets={tickets}
        onTicketClick={setSelectedTicket}
        onMove={handleMove}
      />

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() =>
            setSelectedTicket(null)
          }
        />
      )}

    </div>
  );
}

export default Dashboard;