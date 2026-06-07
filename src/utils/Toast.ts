import toast from "react-hot-toast";

export const ToastError = (mes: string): string => {
  return toast.error(mes);
};
export const ToastSuccess = (mes: string): string => {
  return toast.success(mes);
};
