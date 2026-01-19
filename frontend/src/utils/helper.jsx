import { toast } from "react-toastify";

export const handleError = (error) => {
  toast.error(error?.message || error);
};

export const handleResponse = (success, message) => {
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
