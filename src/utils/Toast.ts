import toast, { type ToastOptions } from "react-hot-toast";

export const ToastError = (mes: string, options?: ToastOptions): string => {
  return toast.error(mes, { ...options });
};
export const ToastSuccess = (mes: string, options?: ToastOptions): string => {
  return toast.success(mes, { ...options });
};
