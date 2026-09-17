import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, onOpenDetail }) => {
  // Cálculo porcentual del descuento
  const discount = Math.round(((product.precioAnterior - product.precio) / product.precioAnterior) * 100);

  return (
    <div className="product-card">
      {/* Banderolas visuales */}
      {discount > 0 && <span className="badge-discount">-{discount}%</span>}
      <span className="badge-tag">MÁS VENDIDO</span>

      <div className="product-image-wrap" onClick={() => onOpenDetail(product)}>
        <img src={product.imagen} alt={product.nombre} loading="lazy" />
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