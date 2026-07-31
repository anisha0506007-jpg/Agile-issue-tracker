import { useState, useCallback, useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import "../style/dashboard.css"
import {
  getTickets,
  updateTicket,
} from "../services/ticketServices";
import TicketDetails from "./TicketDetails";
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
  const [showTicketList, setShowTicketList] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

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

  const stats = useMemo(() => {
    return {
      total: tickets.length,
      todo: tickets.filter(
        (t) => t.status === "todo"
      ).length,
      progress: tickets.filter(
        (t) => t.status === "progress"
      ).length,
      done: tickets.filter(
        (t) => t.status === "done"
      ).length,
    };
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        ticket.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" ||
        ticket.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tickets,
    search,
    statusFilter,
    priorityFilter,
  ]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <h2>Loading Tickets...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="loading-container">
        <h2>Something went wrong!</h2>
        <p>{error?.message || "Failed to load tickets."}</p>
      </div>
    );
  }


  return (
    <div className="dashboard">


      <div className="dashboard-header">

        <div className="header-left">

         

          <h1> 🚀 Agile Issue Tracker</h1>

          <p>
            Manage your team's work efficiently, organize tasks,
            and track every issue from start to completion.
          </p>

        </div>

        <div className="header-buttons">

          <button
            className="ticket-list-btn"
            onClick={() => setShowTicketList(true)}
          >
            📋 All Tickets
            <span className="count-badge">
              {tickets.length}
            </span>
          </button>

          <Link to="/create-ticket">
            <button className="new-ticket-btn">
              ➕ Create Ticket
            </button>
          </Link>

        </div>

      </div>   

      <div className="filter-container">

        <input
          type="text"
          placeholder="🔍 Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

      </div>


      <div className="stats-container">

        <div className="stat-card total">

          <div className="stat-icon">
            📋
          </div>

          <div>
            <span>Total Tickets</span>
            <h2>{stats.total}</h2>
          </div>

        </div>

        <div className="stat-card todo">

          <div className="stat-icon">
            📝
          </div>

          <div>
            <span>To Do</span>
            <h2>{stats.todo}</h2>
          </div>

        </div>

        <div className="stat-card progress">

          <div className="stat-icon">
            ⚡
          </div>

          <div>
            <span>In Progress</span>
            <h2>{stats.progress}</h2>
          </div>

        </div>

        <div className="stat-card done">

          <div className="stat-icon">
            ✅
          </div>

          <div>
            <span>Completed</span>
            <h2>{stats.done}</h2>
          </div>

        </div>

      </div>


      {filteredTickets.length === 0 ? (

        <div className="empty-state">

          <h2>📂 No Tickets Found</h2>

          <p>
            Try changing your filters or create a new ticket.
          </p>

        </div>

      ) : (

        <Board
          tickets={filteredTickets}
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

      {
        showTicketList && (
          <TicketDetails

            tickets={tickets}

            onClose={() =>
              setShowTicketList(false)
            }

          />
        )
      }
    </div>
  );
}

export default Dashboard;