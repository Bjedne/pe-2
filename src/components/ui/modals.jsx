import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteVenue } from "../../api/delete";

export default function DeleteModal({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await DeleteVenue(id);

      if (!response.ok) {
        throw new Error("Failed to delete venue.");
      }

      // Successfully deleted
      setErrorMessage("");
      setIsOpen(false);
      navigate("/profile"); // Navigate to profile or another page after deletion
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <button
        className="bg-danger px-4 py-3 mb-8 rounded-xl text-white w-1/2 mx-auto"
        onClick={open}
      >
        Delete Venue
      </button>

      <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 border-2">
            <DialogTitle as="h3" className="text-base font-medium">
              Delete Venue
            </DialogTitle>
            <p className="mt-2 text-sm">
              Are you sure you want to delete your venue? This action cannot be undone.
            </p>

            {errorMessage && (
              <p className="text-danger mt-2 text-sm">{errorMessage}</p>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="rounded-md bg-danger py-1.5 px-3 text-sm font-semibold text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                className="rounded-md bg-gray-200 py-1.5 px-3 text-sm font-semibold"
                onClick={close}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}