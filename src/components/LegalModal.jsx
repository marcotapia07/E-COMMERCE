import React from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2, HelpCircle, Truck } from 'lucide-react';

export const LegalModal = ({ pageKey, onClose }) => {
  if (!pageKey) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="legal-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera Dinámica */}
        <div className="legal-modal-header">
          <div className="legal-header-title">
            {pageKey === 'terminos' && <FileText size={22} color="#4f46e5" />}
            {pageKey === 'privacidad' && <Lock size={22} color="#10b981" />}
            {pageKey === 'como-comprar' && <HelpCircle size={22} color="#f59e0b" />}
            {pageKey === 'envios' && <Truck size={22} color="#6366f1" />}
            {pageKey === 'garantia' && <ShieldCheck size={22} color="#10b981" />}
            {pageKey === 'preguntas-frecuentes' && <HelpCircle size={22} color="#818cf8" />}

            <h3>
              {pageKey === 'terminos' && 'Términos y Condiciones de Uso'}
              {pageKey === 'privacidad' && 'Política de Privacidad'}
              {pageKey === 'como-comprar' && '¿Cómo realizar un pedido?'}
              {pageKey === 'envios' && 'Métodos de Envío y Entregas'}
              {pageKey === 'garantia' && 'Garantías y Devoluciones'}
              {pageKey === 'preguntas-frecuentes' && 'Preguntas Frecuentes (FAQ)'}
            </h3>
          </div>
          <button className="legal-close-btn" onClick={onClose} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Contenido Dinámico */}
        <div className="legal-modal-body">
          {pageKey === 'terminos' && (
            <div className="legal-content">
              <p className="legal-intro">
                Bienvenido a nuestro catálogo digital. Al navegar y realizar pedidos a través de esta plataforma, aceptas los siguientes términos de uso.
              </p>
              <h4>1. Funcionamiento del Catálogo</h4>
              <p>Este sitio web opera como un catálogo informativo y carrito de pedidos directo hacia WhatsApp. La selección de productos no constituye un pago en línea automático.</p>
              <h4>2. Precios y Disponibilidad</h4>
              <p>Los precios y el stock están sujetos a confirmación directa al enviar el mensaje por WhatsApp.</p>
            </div>
          )}

          {pageKey === 'privacidad' && (
            <div className="legal-content">
              <p className="legal-intro">
                En EcuadorTienda valoramos tu privacidad. A continuación, detallamos cómo manejamos la información de nuestros clientes.
              </p>
              <h4>1. Recopilación de Datos</h4>
              <p>No solicitamos registro de usuario, contraseñas ni datos bancarios dentro de este sitio web. Solo se solicita tu nombre opcional para la atención en WhatsApp.</p>
              <h4>2. Uso de la Información</h4>
              <p>La información enviada por WhatsApp se utiliza exclusivamente para procesar tu solicitud y coordinar la entrega.</p>
            </div>
          )}

          {pageKey === 'como-comprar' && (
            <div className="legal-content">
              <p className="legal-intro">Realizar un pedido es súper rápido y fácil. Sigue estos sencillos pasos:</p>
              <h4>Paso 1: Explora el Catálogo</h4>
              <p>Navega por las categorías o usa el buscador para encontrar tus productos favoritos.</p>
              <h4>Paso 2: Agrega al Carrito</h4>
              <p>Haz clic en el botón "Agregar" e ingresa la cantidad que deseas llevar.</p>
              <h4>Paso 3: Envía tu Pedido</h4>
              <p>Abre el carrito arriba a la derecha y haz clic en "Enviar Pedido por WhatsApp". Se abrirá un chat directo con tu lista preparada.</p>
            </div>
          )}

          {pageKey === 'envios' && (
            <div className="legal-content">
              <p className="legal-intro">Coordinamos envíos seguros y rápidos directamente con el cliente.</p>
              <h4>Envíos Locales</h4>
              <p>Entregas el mismo día o en 24 horas mediante mensajería directa en la ciudad.</p>
              <h4>Envíos Nacionales</h4>
              <p>Realizamos envíos a todo el país a través de agencias de transporte certificadas (Servientrega, Encomiendas, etc.).</p>
            </div>
          )}

          {pageKey === 'garantia' && (
            <div className="legal-content">
              <p className="legal-intro">Tu compra está protegida con nosotros.</p>
              <h4>Cobertura por Defectos de Fábrica</h4>
              <p>Todos los productos electrónicos cuentan con garantía por fallas de fabricación. Comunícate directamente por WhatsApp con tu comprobante digital para coordinar el cambio.</p>
            </div>
          )}

          {pageKey === 'preguntas-frecuentes' && (
            <div className="legal-content">
              <h4>¿Tienen local físico?</h4>
              <p>Operamos de forma 100% digital con entrega directa a domicilio y despacho nacional.</p>
              <h4>¿Cuáles son los métodos de pago?</h4>
              <p>Aceptamos transferencia bancaria, depósito y pago en efectivo contra entrega según la zona.</p>
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        <div className="legal-modal-footer">
          <button className="legal-accept-btn" onClick={onClose}>
            <CheckCircle2 size={18} /> Entendido
          </button>
        </div>
      </div>
    </div>
  );
};