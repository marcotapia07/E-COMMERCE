import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  MessageCircle, 
  HelpCircle, 
  FileText, 
  Lock
} from 'lucide-react';

export const Footer = ({ onOpenPage, PHONE_NUMBER }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* 1. CINTA DE CONFIANZA / GARANTÍAS */}
      <div className="footer-benefits-bar">
        <div className="benefit-item">
          <Truck size={22} color="#818cf8" />
          <div>
            <h4>Envíos Rápidos</h4>
            <p>Acuérdalo directamente por WhatsApp</p>
          </div>
        </div>
        <div className="benefit-item">
          <ShieldCheck size={22} color="#10b981" />
          <div>
            <h4>Compra 100% Segura</h4>
            <p>Trato directo sin intermediarios</p>
          </div>
        </div>
        <div className="benefit-item">
          <Clock size={22} color="#f59e0b" />
          <div>
            <h4>Atención Inmediata</h4>
            <p>Respuestas rápidas a tu pedido</p>
          </div>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL DEL FOOTER */}
      <div className="footer-main-content">
        {/* Columna 1: Información de la Tienda */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-badge">EXPRESS</span>
            <h3>EcuadorTienda</h3>
          </div>
          <p className="footer-about">
            Tu catálogo digital de confianza. Selecciona tus productos favoritos y realiza tu pedido al instante mediante WhatsApp.
          </p>
          
          {/* Redes Sociales con SVGs Inline para evitar errores de librerías */}
          <div className="footer-socials">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            
            {/* WhatsApp */}
            <a href={`https://wa.me/${PHONE_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Columna 2: Atención al Cliente */}
        <div className="footer-col">
          <h4>Atención al Cliente</h4>
          <ul>
            <li>
              <button onClick={() => onOpenPage('como-comprar')}>
                <HelpCircle size={14} /> ¿Cómo realizar un pedido?
              </button>
            </li>
            <li>
              <button onClick={() => onOpenPage('envios')}>
                <Truck size={14} /> Métodos de Envío y Entregas
              </button>
            </li>
            <li>
              <button onClick={() => onOpenPage('garantia')}>
                <ShieldCheck size={14} /> Garantías y Devoluciones
              </button>
            </li>
          </ul>
        </div>

        {/* Columna 3: Ayuda y Legales */}
        <div className="footer-col">
          <h4>Soporte y Legal</h4>
          <ul>
            <li>
              <button onClick={() => onOpenPage('preguntas-frecuentes')}>
                <HelpCircle size={14} /> Preguntas Frecuentes (FAQ)
              </button>
            </li>
            <li>
              <button onClick={() => onOpenPage('terminos')}>
                <FileText size={14} /> Términos y Condiciones
              </button>
            </li>
            <li>
              <button onClick={() => onOpenPage('privacidad')}>
                <Lock size={14} /> Política de Privacidad
              </button>
            </li>
          </ul>
        </div>

        {/* Columna 4: Contacto Directo */}
        <div className="footer-col contact-col">
          <h4>Contacto Directo</h4>
          <p className="contact-info-text">
            ¿Tienes dudas sobre algún producto? Escríbenos directamente a nuestra línea de atención:
          </p>
          <a 
            href={`https://wa.me/${PHONE_NUMBER}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-wa-btn"
          >
            <MessageCircle size={18} />
            <span>Chat de Soporte WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 3. BARRA INFERIOR / COPYRIGHT */}
      <div className="footer-bottom-bar">
        <p>© {currentYear} EcuadorTienda. Todos los derechos reservados.</p>
        <div className="footer-legal-links">
          <button onClick={() => onOpenPage('terminos')}>Términos de uso</button>
          <span>•</span>
          <button onClick={() => onOpenPage('privacidad')}>Privacidad</button>
        </div>
      </div>
    </footer>
  );
};