import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastSuccess = (message) => {
    toast.success(message);
};

export const showToastError = (message) => {
    toast.error(message);
};
