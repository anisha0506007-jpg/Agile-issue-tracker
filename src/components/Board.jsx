import Column from "./Column";

function Board({ tickets, onTicketClick }) {
  const todo = tickets.filter(
    (ticket) => ticket.status === "todo"
  );

  const progress = tickets.filter(
    (ticket) => ticket.status === "progress"
  );

  const done = tickets.filter(
    (ticket) => ticket.status === "done"
  );

  return (
    <div className="board">
      <Column
        title="To Do"
        tickets={todo}
        onTicketClick={onTicketClick}
      />

      <Column
        title="In Progress"
        tickets={progress}
        onTicketClick={onTicketClick}
      />

      <Column
        title="Done"
        tickets={done}
        onTicketClick={onTicketClick}
      />
    </div>
  );
}

export default Board;