import { useState, useCallback } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTickets,
  updateTicket,
} from "../services/ticketServices";

import Board from "../components/Board";
import TicketModal from "../components/TicketModal";


function Dashboard() {
  const queryClient = useQueryClient();

  const initialTickets = useLoaderData();

  const {
    data: tickets = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    initialData: initialTickets,
  });

  const [selectedTicket, setSelectedTicket] =
    useState(null);

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

    onError: (err, updatedTicket, context) => {
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

  const handleMove = useCallback(
    (ticket, newStatus) => {
      mutation.mutate({
        ...ticket,
        status: newStatus,
      });
    },
    [mutation]
  );

  const handleTicketClick = useCallback((ticket) => {
    setSelectedTicket(ticket);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTicket(null);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <h2>Loading Tickets...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
      </div>
    );
  }

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

      {tickets.length === 0 ? (
        <div className="empty-state">
          <h2>No Tickets Found</h2>

          <p>
            Click on "New Ticket" to create your
            first ticket.
          </p>
        </div>
      ) : (
        <Board
          tickets={tickets}
          onTicketClick={handleTicketClick}
          onMove={handleMove}
        />
      )}

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Dashboard;