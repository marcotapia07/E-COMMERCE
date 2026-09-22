import React from 'react';
import { Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Zap, Truck } from 'lucide-react';

export const HeroBanner = ({ onExploreClick }) => {
  return (
    <section className="hero-modern-banner">
      {/* Columna Izquierda: Mensaje Principal */}
      <div className="hero-text-container">
        <div className="hero-top-badge">
          <Sparkles size={15} color="#818cf8" />
          <span>Novedades & Tendencias</span>
          <span className="badge-divider">•</span>
          <span className="offer-highlight">Descuentos Especiales</span>
        </div>

        <h1 className="hero-main-title">
          Productos que hacen tu vida <br className="title-br" />
          <span className="gradient-text">más fácil</span>
        </h1>

        <p className="hero-subtext">
          Descubre lo mejor en tecnología, hogar y accesorios con garantía de satisfacción y pedidos instantáneos por WhatsApp.
        </p>

        <div className="hero-cta-wrapper">
          <button className="hero-btn-primary" onClick={onExploreClick}>
            <ShoppingBag size={18} />
            <span>Ver Catálogo</span>
            <ArrowRight size={16} />
          </button>

          <div className="hero-trust-tag">
            <Zap size={16} color="#10b981" />
            <span>Pedidos directos sin tarjetas</span>
          </div>
        </div>

        {/* Garantías compactas en lugar de la barra azul */}
        <div className="hero-features-row">
          <div className="feature-pill">
            <Truck size={15} color="#a5b4fc" />
            <span>Envíos Nacionales</span>
          </div>
          <div className="feature-pill">
            <ShieldCheck size={15} color="#10b981" />
            <span>Atención 100% Personalizada</span>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Tarjeta Visual Ilustrativa */}
      <div className="hero-visual-container">
        <div className="floating-card product-preview-1">
          <div className="preview-icon">🎧</div>
          <div className="preview-info">
            <h4>Audio & Tech</h4>
            <p>Hasta -40% OFF</p>
          </div>
        </div>

        <div className="floating-card product-preview-2">
          <div className="preview-icon">⌚</div>
          <div className="preview-info">
            <h4>Smartwatches</h4>
            <p>Modelos 2026</p>
          </div>
        </div>

        <div className="hero-glow-effect"></div>
      </div>
    </section>
  );
};