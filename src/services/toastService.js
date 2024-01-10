import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Service function to display a toast message
export const showToast = (message, type) => {
  // Set default type to "info" if not provided
  const toastType = type || 'info';

  // Show the toast message
  toast[toastType](message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1500, // Set the duration for how long the toast message will be shown
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
