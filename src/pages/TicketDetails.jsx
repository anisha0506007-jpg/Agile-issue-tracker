import "../style/TicketDetails.css";

function TicketDetails({
  tickets,
  onClose,
}) {
  return (
    <div className="details-overlay">

      <div className="details-box">

        <div className="details-header">

          <h2>
            📋 All Tickets
          </h2>

          <button onClick={onClose}>
            ✖
          </button>

        </div>

        <p className="total-ticket">
          Total Tickets : {tickets.length}
        </p>

        <table>

          <thead>

            <tr>
              <th>Title</th>
              <th>Assignee</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {tickets.map(ticket=>(
              <tr key={ticket.id}>
                <td>{ticket.title}</td>

                <td>{ticket.assignee}</td>

                <td>{ticket.priority}</td>

                <td>{ticket.status}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TicketDetails;