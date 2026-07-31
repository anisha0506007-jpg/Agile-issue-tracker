import { Form, useNavigate } from "react-router-dom";
import "../style/CreateTicket.css";

function CreateTicket() {
  const navigate = useNavigate();

  return (
    <div className="create-ticket">
  <h1>Create New Ticket</h1>

  <Form method="post">

    <input
      type="text"
      name="title"
      placeholder="Ticket Title"
      required
    />

    <textarea
      name="description"
      placeholder="Description"
      required
    ></textarea>

    <input
      type="text"
      name="assignee"
      placeholder="Assignee"
      required
    />

    <select name="priority">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>

    <div className="form-buttons">
      <button
        type="button"
        className="back-btn"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>

      <button
        type="submit"
        className="create-btn"
      >
        Create Ticket →
      </button>
    </div>

  </Form>
</div>
  );
}

export default CreateTicket;