import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setSelectedImgIndex(0);
  }, [product]);

  if (!product) return null;

  const images = product.imagenes && product.imagenes.length > 0 
    ? product.imagenes 
    : [product.imagen];

  const discount = product.precioAnterior 
    ? Math.round(((product.precioAnterior - product.precio) / product.precioAnterior) * 100) 
    : 0;

  const handleNextImg = (e) => {
    e.stopPropagation();
    setSelectedImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setSelectedImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
          {/* ÚNICA COLUMNA IZQUIERDA: Galería completa */}
          <div className="modal-gallery-wrapper">
            <div className="modal-image-container">
              {discount > 0 && <span className="modal-badge-discount">-{discount}% OFF</span>}
              
              <img 
                src={images[selectedImgIndex] || product.imagen} 
                alt={product.nombre} 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80";
                }}
              />

              {/* Flechas laterales si hay más de 1 foto */}
              {images.length > 1 && (
                <>
                  <button className="modal-img-arrow left" onClick={handlePrevImg} title="Anterior">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="modal-img-arrow right" onClick={handleNextImg} title="Siguiente">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas cuadradas alineadas debajo de la foto principal */}
            {images.length > 1 && (
              <div className="modal-thumbnails-strip">
                {images.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`modal-thumb-btn ${selectedImgIndex === index ? 'active' : ''}`}
                    onClick={() => setSelectedImgIndex(index)}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Vista ${index + 1}`} 
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ÚNICA COLUMNA DERECHA: Información */}
          <div className="modal-info-column">
            <span className="modal-category-tag">{product.categoria || 'General'}</span>
            <h2 className="modal-product-title">{product.nombre}</h2>
            <p className="modal-product-sku">SKU: <strong>{product.sku}</strong></p>

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

            <div className="modal-price-box">
              <span className="modal-current-price">${product.precio.toFixed(2)}</span>
              {product.precioAnterior && (
                <span className="modal-old-price">${product.precioAnterior.toFixed(2)}</span>
              )}
            </div>

            <div className="modal-description-box">
              <h4>Descripción del producto</h4>
              <p>{product.descripcion || 'Sin descripción disponible.'}</p>
            </div>

            <div className="modal-quantity-selector">
              <span className="qty-label">Cantidad:</span>
              <div className="qty-controls">
                <button type="button" onClick={handleDecrease} className="qty-btn"><Minus size={16} /></button>
                <span className="qty-value">{quantity}</span>
                <button type="button" onClick={handleIncrease} className="qty-btn"><Plus size={16} /></button>
              </div>
            </div>

            <button className="modal-add-to-cart-btn" onClick={handleAdd}>
              <ShoppingCart size={20} />
              <span>Agregar al Carrito • ${(product.precio * quantity).toFixed(2)}</span>
            </button>

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