// Toast notifications utility
let toastContainer: HTMLDivElement | null = null;

export interface ToastOptions {
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const showToast = (message: string, options?: ToastOptions) => {
  const { type = 'info', duration = 3000 } = options || {};

  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColor = {
    success: 'bg-success-green',
    error: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-primary',
  }[type];

  toast.className = `${bgColor} text-white px-4 py-3 rounded-lg shadow-lg pointer-events-auto animate-slide-in-right`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
};

export const success = (message: string) => showToast(message, { type: 'success' });
export const error = (message: string) => showToast(message, { type: 'error' });
export const info = (message: string) => showToast(message, { type: 'info' });
export const warning = (message: string) => showToast(message, { type: 'warning' });
