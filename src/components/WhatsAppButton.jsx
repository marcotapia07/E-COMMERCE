import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = ({ PHONE_NUMBER }) => {
  const message = encodeURIComponent("¡Hola! Quisiera realizar una consulta sobre sus productos.");
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${message}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-floating-btn"
      title="Contactar por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} color="#ffffff" />
      <span className="whatsapp-tooltip">¿Dudas? ¡Escríbenos!</span>
    </a>
  );
};