import React, { useState } from 'react';
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, onOpenDetail }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Obtener arreglo de imágenes o fallback a la imagen única
  const images = product.imagenes && product.imagenes.length > 0 ? product.imagenes : [product.imagen];

  // Cálculo porcentual del descuento
  const discount = product.precioAnterior 
    ? Math.round(((product.precioAnterior - product.precio) / product.precioAnterior) * 100)
    : 0;

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="product-card">
      {/* Banderolas visuales */}
      {discount > 0 && <span className="badge-discount">-{discount}%</span>}
      <span className="badge-tag">MÁS VENDIDO</span>

      {/* Contenedor de Imagen con soporte para navegación */}
      <div className="product-image-wrap" onClick={() => onOpenDetail(product)}>
        <img 
          src={images[currentImgIndex]} 
          alt={product.nombre} 
          loading="lazy" 
        />

        {/* Flechas y puntos solo si hay más de 1 imagen */}
        {images.length > 1 && (
          <>
            <button className="card-img-arrow left" onClick={handlePrevImg} title="Foto anterior">
              <ChevronLeft size={16} />
            </button>
            <button className="card-img-arrow right" onClick={handleNextImg} title="Siguiente foto">
              <ChevronRight size={16} />
            </button>

            <div className="card-img-dots">
              {images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot ${idx === currentImgIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title" onClick={() => onOpenDetail(product)}>
          {product.nombre}
        </h3>

        {/* Rating con Estrellas */}
        <div className="product-rating">
          <Star size={12} fill="#f59e0b" stroke="none" />
          <Star size={12} fill="#f59e0b" stroke="none" />
          <Star size={12} fill="#f59e0b" stroke="none" />
          <Star size={12} fill="#f59e0b" stroke="none" />
          <Star size={12} fill="#f59e0b" stroke="none" />
          <span>({product.ventas || 45})</span>
        </div>

        {/* Precios */}
        <div className="price-container">
          <span className="current-price">${product.precio.toFixed(2)}</span>
          {product.precioAnterior && (
            <span className="old-price">${product.precioAnterior.toFixed(2)}</span>
          )}
        </div>

        <button className="btn-add-cart-fast" onClick={() => onAddToCart(product, 1)}>
          <ShoppingCart size={16} /> Agregar
        </button>
      </div>
    </div>
  );
};