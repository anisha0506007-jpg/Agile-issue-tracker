import Ticket from "./Ticket";

function Column({
  title,
  tickets,
  onTicketClick,
  onMove,
}) {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>

        <span className="ticket-count">
          {tickets.length}
        </span>
      </div>

      <div className="column-body">
        {tickets.length === 0 ? (
          <p className="empty-column">
            No tickets
          </p>
        ) : (
          tickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              onClick={onTicketClick}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;