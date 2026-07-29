import React from "react";
import Column from "./Column";

function Board({
  tickets,
  onTicketClick,
  onMove,
}) {
  console.log("Rendering Board");

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
        onMove={onMove}
      />

      <Column
        title="In Progress"
        tickets={progress}
        onTicketClick={onTicketClick}
        onMove={onMove}
      />

      <Column
        title="Done"
        tickets={done}
        onTicketClick={onTicketClick}
        onMove={onMove}
      />
    </div>
  );
}

export default React.memo(Board);