import React from 'react'
import { toast } from "react-toastify";

const ToastSuccess =(msg) =>{

    toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
}

const ToastError =(msg) =>{

    toast.error(msg, {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
}

export  {ToastSuccess,ToastError}