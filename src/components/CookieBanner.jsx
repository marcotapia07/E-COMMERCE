import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export const CookieBanner = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookies_accepted');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookies_accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner-card">
      <div className="cookie-content">
        <div className="cookie-icon-box">
          <Cookie size={20} color="#818cf8" />
        </div>
        <p className="cookie-text">
          Utilizamos cookies propias y de terceros para optimizar tu experiencia en el sitio. Al continuar navegando, aceptas nuestra{' '}
          <button 
            type="button" 
            className="cookie-link-btn"
            onClick={() => onOpenPrivacy('privacidad')}
          >
            Política de Privacidad
          </button>.
        </p>
      </div>

      <div className="cookie-actions">
        <button type="button" className="cookie-accept-btn" onClick={handleAccept}>
          Aceptar
        </button>
        <button 
          type="button" 
          className="cookie-close-btn" 
          onClick={handleAccept}
          aria-label="Cerrar aviso de cookies"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};