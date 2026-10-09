import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Zap, Maximize2, X } from 'lucide-react';

export const HeroBanner = ({ onExploreClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Contenedor del Banner Principal */}
      <section className="hero-banner-container">
        <div className="hero-bg-wrapper" onClick={openModal} title="Haz clic para ver la imagen completa">
          <img 
            src="/hero-banner.jpeg" 
            alt="Combazo Store Banner" 
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
          
          {/* Botón flotante disimulado para avisar que se puede ampliar */}
          <button type="button" className="hero-expand-btn" onClick={openModal}>
            <Maximize2 size={16} />
            <span>Ver Arte Completo</span>
          </button>
        </div>

        {/* Acciones principales */}
        <div className="hero-content-layer">
          <div className="hero-actions-wrapper">
            <button className="hero-btn-primary" onClick={onExploreClick}>
              <ShoppingBag size={18} />
              <span>Ver Catálogo Completo</span>
              <ArrowRight size={16} />
            </button>

            <div className="hero-trust-badge">
              <Zap size={15} color="#facc15" />
              <span>Pedidos directos por WhatsApp sin tarjeta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal / Lightbox a Pantalla Completa (se abre al hacer clic) */}
      {isModalOpen && (
        <div className="hero-modal-overlay" onClick={closeModal}>
          <div className="hero-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="hero-modal-close" onClick={closeModal} aria-label="Cerrar">
              <X size={24} />
            </button>
            <img 
              src="/hero-banner.jpeg" 
              alt="Combazo Store Promoción Completa" 
              className="hero-modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
};