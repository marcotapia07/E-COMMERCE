import React from 'react';
import { Truck, MessageCircle, ShieldCheck } from 'lucide-react';

export const TrustBar = ({ PHONE_NUMBER }) => {
  return (
    <div className="trust-ribbon-container">
      {/* 1. Envíos */}
      <div className="trust-item">
        <div className="trust-icon-box">
          <Truck size={18} color="#818cf8" />
        </div>
        <div className="trust-text">
          <span className="trust-title">Envíos a todo el Ecuador</span>
          <span className="trust-subtitle">Entregas rápidas y seguras</span>
        </div>
      </div>

      <div className="trust-divider"></div>

      {/* 2. Atención por WhatsApp */}
      <a 
        href={`https://wa.me/${PHONE_NUMBER}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="trust-item trust-link"
      >
        <div className="trust-icon-box wa-box">
          <MessageCircle size={18} color="#10b981" />
        </div>
        <div className="trust-text">
          <span className="trust-title">Atención por WhatsApp</span>
          <span className="trust-subtitle">Asesoría directa e inmediata</span>
        </div>
      </a>

      <div className="trust-divider"></div>

      {/* 3. Pago Seguro / Contra Entrega */}
      <div className="trust-item">
        <div className="trust-icon-box">
          <ShieldCheck size={18} color="#34d399" />
        </div>
        <div className="trust-text">
          <span className="trust-title">Compra 100% Segura</span>
          <span className="trust-subtitle">Pago contra entrega disponible</span>
        </div>
      </div>
    </div>
  );
};