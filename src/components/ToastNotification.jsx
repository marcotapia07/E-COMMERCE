import React from 'react';
import { CheckCircle2, ShoppingCart } from 'lucide-react';

export const ToastNotification = ({ toastMessage, onClose }) => {
  if (!toastMessage) return null;

  return (
    <div className="toast-notification-card">
      <div className="toast-icon-wrapper">
        <CheckCircle2 size={20} color="#10b981" />
      </div>
      <div className="toast-content">
        <span className="toast-title">¡Producto agregado!</span>
        <span className="toast-text">{toastMessage}</span>
      </div>
      <div className="toast-cart-icon">
        <ShoppingCart size={18} color="#6366f1" />
      </div>
    </div>
  );
};