import { Form } from "react-router-dom";

function CreateTicket() {
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

        <button type="submit">
          Create Ticket
        </button>

      </Form>
    </div>
  );
}

export default CreateTicket;