import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`toast toast-${toast.type}`}
          >
            {toast.type === 'success' && <CheckCircle size={18} color="var(--gold-light)" />}
            {toast.type === 'error' && <AlertCircle size={18} color="var(--error)" />}
            {toast.type === 'info' && <Info size={18} color="var(--gold)" />}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button onClick={() => onRemove(toast.id)} style={{ color: 'var(--stone)' }}>
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
