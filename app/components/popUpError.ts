"use client";

import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

const popUpError = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export default popUpError;
