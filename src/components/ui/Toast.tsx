
"use client";

import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const icons = {
  success: <CheckCircleIcon className="w-6 h-6 text-green-400" />,
  error: <XCircleIcon className="w-6 h-6 text-red-400" />,
  info: <InformationCircleIcon className="w-6 h-6 text-blue-400" />,
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div className="rounded-md border border-accent/20 bg-background-light p-4 shadow-lg flex items-start gap-3 max-w-sm">
      {icons[type]}
      <p className="text-sm text-text flex-1 leading-5">{message}</p>
      <button
        onClick={onClose}
        className="text-text/60 hover:text-text"
        aria-label="Close"
        type="button"
      >
        <XCircleIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
