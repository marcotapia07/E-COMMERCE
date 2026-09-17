import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, ChevronDown, Package, HelpCircle, MessageCircle } from 'lucide-react';

export const Navbar = ({ 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  setSearchQuery, 
  categories, 
  selectedCategory, 
  onSelectCategory,
  onOpenHelp,
  PHONE_NUMBER
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el menú desplegable al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header-single-nav">
      <div className="nav-wrapper">
        
        {/* 1. BRAND / LOGO */}
        <div className="brand-zone" onClick={() => onSelectCategory('Todos')}>
          <span className="logo-badge">EXPRESS</span>
          <div className="logo-text">
            <h2>EcuadorTienda</h2>
            <p>Catálogo Digital</p>
          </div>
        </div>

        {/* 2. MENÚ DESPLEGABLE DE CATEGORÍAS (Acción por Clic) */}
        <div className="category-selector-wrapper" ref={dropdownRef}>
          <button 
            type="button"
            className={`category-select-btn ${isCategoryOpen ? 'active' : ''}`}
            onClick={() => setIsCategoryOpen(prev => !prev)}
          >
            <Package size={18} color="#4f46e5" />
            <span>{selectedCategory === 'Todos' ? 'Categorías' : selectedCategory}</span>
            <ChevronDown 
              size={16} 
              style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} 
            />
          </button>

          {isCategoryOpen && (
            <div className="mega-menu-dropdown">
              <div 
                className={`menu-item ${selectedCategory === 'Todos' ? 'active' : ''}`}
                onClick={() => {
                  onSelectCategory('Todos');
                  setIsCategoryOpen(false);
                }}
              >
                <Package size={16} color="#6366f1" />
                <span>Todas las Categorías</span>
              </div>
              
              {categories.filter(c => c !== 'Todos').map((cat) => (
                <div 
                  key={cat} 
                  className={`menu-item ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    onSelectCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                >
                  <span className="bullet-point">•</span>
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. BARRA DE BÚSQUEDA CENTRADA */}
        <div className="search-bar-wrap">
          <input 
            type="text" 
            placeholder="Buscar por producto, modelo o código SKU..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="main-search-input"
          />
          <button className="search-action-btn" title="Buscar">
            <Search size={18} />
          </button>
        </div>

        {/* 4. ACCIONES ÚTILES DERECHA */}
        <div className="nav-right-actions">
          {/* Botón Centro de Ayuda */}
          <button className="nav-action-link" onClick={onOpenHelp} title="Centro de Ayuda">
            <HelpCircle size={20} color="#6366f1" />
            <span>Ayuda</span>
          </button>

          {/* Botón WhatsApp Directo */}
          <a 
            href={`https://wa.me/${PHONE_NUMBER}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-action-link whatsapp-direct"
            title="Contacto Directo"
          >
            <MessageCircle size={20} color="#10b981" />
            <span>Soporte</span>
          </a>

          {/* Botón Carrito */}
          <button className="nav-cart-btn" onClick={onOpenCart}>
            <ShoppingCart size={20} />
            <span>Carrito</span>
            {cartCount > 0 && <span className="cart-pill">{cartCount}</span>}
          </button>
        </div>

      </div>
    </header>
  );
};