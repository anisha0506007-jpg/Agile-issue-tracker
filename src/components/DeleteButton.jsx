import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTicket } from "../services/ticketServices";

function DeleteButton({ id }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTicket,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) return;

    mutation.mutate(id);
  };

  return (
    <button
      className="delete-btn"
      onClick={handleDelete}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Deleting..." : "Delete"}
    </button>
  );
}

export default DeleteButton;