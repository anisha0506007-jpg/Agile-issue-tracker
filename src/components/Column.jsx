import Ticket from "./Ticket";

function Column({ title, tickets, onTicketClick }) {
  return (
    <div className="column">
      <h2>{title}</h2>

      {tickets.map((ticket) => (
        <Ticket
          key={ticket.id}
          ticket={ticket}
          onClick={onTicketClick}
        />
      ))}
    </div>
  );
}

export default Column;