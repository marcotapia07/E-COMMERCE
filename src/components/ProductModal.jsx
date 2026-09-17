import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';

export const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discount = product.precioAnterior 
    ? Math.round(((product.precioAnterior - product.precio) / product.precioAnterior) * 100) 
    : 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botón de Cierre */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>

        <div className="modal-grid-layout">
          {/* Columna Izquierda: Galería / Imagen */}
          <div className="modal-image-column">
            <div className="modal-image-container">
              {discount > 0 && <span className="modal-badge-discount">-{discount}% OFF</span>}
              <img 
                src={product.imagen} 
                alt={product.nombre} 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80";
                }}
              />
            </div>
          </div>

          {/* Columna Derecha: Información del Producto */}
          <div className="modal-info-column">
            <span className="modal-category-tag">{product.categoria || 'General'}</span>
            <h2 className="modal-product-title">{product.nombre}</h2>
            <p className="modal-product-sku">SKU: <strong>{product.sku}</strong></p>

            {/* Valoración y Ventas */}
            <div className="modal-rating-row">
              <div className="stars">
                <Star size={16} fill="#f59e0b" stroke="none" />
                <Star size={16} fill="#f59e0b" stroke="none" />
                <Star size={16} fill="#f59e0b" stroke="none" />
                <Star size={16} fill="#f59e0b" stroke="none" />
                <Star size={16} fill="#f59e0b" stroke="none" />
              </div>
              <span className="rating-score">5.0</span>
              <span className="sales-count">• {product.ventas || 50}+ vendidos</span>
            </div>

            {/* Bloque de Precio */}
            <div className="modal-price-box">
              <span className="modal-current-price">${product.precio.toFixed(2)}</span>
              {product.precioAnterior && (
                <span className="modal-old-price">${product.precioAnterior.toFixed(2)}</span>
              )}
            </div>

            {/* Descripción */}
            <div className="modal-description-box">
              <h4>Descripción del producto</h4>
              <p>{product.descripcion || 'Sin descripción detallada disponible para este producto.'}</p>
            </div>

            {/* Selector de Cantidad */}
            <div className="modal-quantity-selector">
              <span className="qty-label">Cantidad:</span>
              <div className="qty-controls">
                <button type="button" onClick={handleDecrease} className="qty-btn"><Minus size={16} /></button>
                <span className="qty-value">{quantity}</span>
                <button type="button" onClick={handleIncrease} className="qty-btn"><Plus size={16} /></button>
              </div>
            </div>

            {/* Botón de Agregar */}
            <button className="modal-add-to-cart-btn" onClick={handleAdd}>
              <ShoppingCart size={20} />
              <span>Agregar al Carrito • ${(product.precio * quantity).toFixed(2)}</span>
            </button>

            {/* Garantías Rápidas */}
            <div className="modal-guarantees">
              <div className="guarantee-chip">
                <Truck size={16} color="#4f46e5" />
                <span>Envío express disponible</span>
              </div>
              <div className="guarantee-chip">
                <ShieldCheck size={16} color="#10b981" />
                <span>Atención directa por WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};