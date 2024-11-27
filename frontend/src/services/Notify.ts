import { toast, ToastPosition } from 'react-toastify';

const positions: { [key: string]: ToastPosition } = {
    topLeft: 'top-left',
    topRight: 'top-right',
    bottomLeft: 'bottom-left',
    bottomRight: 'bottom-right',
    topCenter: 'top-center',
    bottomCenter: 'bottom-center',
}

export const Notify = {
    success: (message: string, POSITION: ToastPosition, autoClose?: number) => toast.success(message, {
        className: "toast-message", 
        position: positions[POSITION] || positions.topRight,
        autoClose: autoClose || 3000
    }),
    error: (message: string, POSITION: string, autoClose?: number) => toast.error(message, {
        className: "toast-message", 
        position: positions[POSITION] || positions.topRight,
        autoClose: autoClose || 3000
    }),
    warning: (message: string, POSITION: string, autoClose?: number) => toast.warning(message, {
        className: "toast-message", 
        position: positions[POSITION] || positions.topRight,
        autoClose: autoClose || 3000
    }),
    info: (message: string, POSITION: string, autoClose?: number) => toast.info(message, {
        className: "toast-message", 
        position: positions[POSITION] || positions.topRight,
        autoClose: autoClose || 3000
    }),
};