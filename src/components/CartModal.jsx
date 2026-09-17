import React, { useState } from 'react';
import { X, Send, Trash2, ShoppingBag, User } from 'lucide-react';

export const CartModal = ({ isOpen, onClose, cart, onRemoveItem, cartTotal, PHONE_NUMBER }) => {
  const [customerName, setCustomerName] = useState('');

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;

    let message = `*NUEVO PEDIDO - CATÁLOGO WEB*\n`;
    if (customerName) message += `*Cliente:* ${customerName}\n`;
    message += `----------------------------------\n`;

    cart.forEach((item) => {
      message += `• ${item.nombre} (x${item.quantity})\n  SKU: ${item.sku} - Subtotal: $${(item.precio * item.quantity).toFixed(2)}\n`;
    });

    message += `----------------------------------\n`;
    message += `*TOTAL A PAGAR: $${cartTotal.toFixed(2)}*\n\n`;
    message += `Quedo a la espera de la confirmación para acordar entrega y pago.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="cart-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del Carrito */}
        <div className="cart-modal-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} color="#4f46e5" />
            <h3>Tu Carrito de Compras</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <ShoppingBag size={48} color="#cbd5e1" />
            <p>Tu carrito está vacío</p>
            <span>Agrega productos del catálogo para realizar tu pedido por WhatsApp.</span>
          </div>
        ) : (
          <div className="cart-modal-body">
            {/* Campo Nombre del Cliente */}
            <div className="cart-input-group">
              <label htmlFor="customer-name">
                <User size={14} /> Nombre del Cliente (Opcional):
              </label>
              <input
                id="customer-name"
                type="text"
                placeholder="Ej. Juan Pérez"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            {/* Lista de Productos Agregados */}
            <div className="cart-items-list">
              {cart.map((item) => (
                <div className="cart-item-row" key={item.id}>
                  <img 
                    src={item.imagen} 
                    alt={item.nombre} 
                    className="cart-item-thumb"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80";
                    }} 
                  />
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.nombre}</span>
                    <span className="cart-item-sku">SKU: {item.sku}</span>
                    <span className="cart-item-qty">{item.quantity} x ${item.precio.toFixed(2)}</span>
                  </div>
                  <div className="cart-item-actions">
                    <span className="cart-item-total">${(item.precio * item.quantity).toFixed(2)}</span>
                    <button 
                      className="cart-remove-btn" 
                      onClick={() => onRemoveItem(item.id)}
                      title="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen Total */}
            <div className="cart-summary-box">
              <div className="cart-summary-row">
                <span>Total a pagar:</span>
                <span className="cart-total-amount">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Botón WhatsApp */}
            <button className="cart-whatsapp-btn" onClick={handleSendWhatsApp}>
              <Send size={18} />
              <span>Enviar Pedido por WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};