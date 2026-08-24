import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Toast, { ToastVariant } from '../componets/layout/Toast';

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    variant: ToastVariant;
  } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideToast = useCallback(() => setToast(null), []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setToast({ message, variant });
      timeoutRef.current = setTimeout(hideToast, 2800);
    },
    [hideToast],
  );
  const showSuccess = useCallback(
    (message: string) => showToast(message, 'success'),
    [showToast],
  );
  const showError = useCallback(
    (message: string) => showToast(message, 'error'),
    [showToast],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError }}>
      {children}
      <Toast
        visible={toast !== null}
        variant={toast?.variant ?? 'success'}
        message={toast?.message ?? ''}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}