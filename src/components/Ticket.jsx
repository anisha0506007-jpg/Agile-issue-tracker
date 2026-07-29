
function Ticket({ ticket, onClick, onMove }) {
  return (
    <div className="ticket-card">
      <div
        className="ticket-content"
        onClick={() => onClick(ticket)}
      >
        <h3>{ticket.title}</h3>

        <p>{ticket.description}</p>

        <div className="ticket-footer">
          <span>
            <strong>👤</strong> {ticket.assignee}
          </span>

          <span
            className={`priority ${ticket.priority.toLowerCase()}`}
          >
            {ticket.priority}
          </span>
        </div>
      </div>

      <div className="ticket-actions">
        {ticket.status !== "todo" && (
          <button
            onClick={() => onMove(ticket, "todo")}
          >
            ← To Do
          </button>
        )}

        {ticket.status !== "progress" && (
          <button
            onClick={() => onMove(ticket, "progress")}
          >
            In Progress
          </button>
        )}

        {ticket.status !== "done" && (
          <button
            onClick={() => onMove(ticket, "done")}
          >
            Done →
          </button>
        )}
      </div>
    </div>
  );
}

export default Ticket;