function Ticket({ ticket, onClick }) {
  return (
    <div className="ticket-card" onClick={() => onClick(ticket)}>
      <h3>{ticket.title}</h3>

      <p>{ticket.description}</p>

      <div className="ticket-footer">
        <span>{ticket.assignee}</span>

        <span>{ticket.priority}</span>
      </div>
    </div>
  );
}

export default Ticket;