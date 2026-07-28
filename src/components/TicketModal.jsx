import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket } from "../services/ticketServices";

function TicketModal({ ticket, onClose }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(ticket);

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const mutation = useMutation({
    mutationFn: updateTicket,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      onClose();
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Edit Ticket</h2>

        <form onSubmit={handleSubmit}>

          <input
            ref={titleRef}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="progress">
              In Progress
            </option>
            <option value="done">Done</option>
          </select>

          <button type="submit">
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default TicketModal;