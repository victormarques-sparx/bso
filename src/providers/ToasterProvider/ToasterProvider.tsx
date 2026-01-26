'use client';

import type { JSX } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToasterProvider = (): JSX.Element => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={6000}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
    />
  );
};
