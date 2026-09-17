import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartModal } from './components/CartModal';
import { Footer } from './components/Footer';
import { Sparkles, Zap } from 'lucide-react';
import { LegalModal } from './components/LegalModal';
import './App.css';

const WHATSAPP_PHONE = "593999999999"; 

// Reemplaza esta URL con la URL de tu Google Sheet publicado en la web en formato CSV
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrujf2N_Fd52z_6BOXHbj_650jp_JyCIYEjyagtQbUO25Z5Yz6GSavmnsGQASN3WZ8Uyw6gqh4AgZm/pub?gid=0&single=true&output=csv"; 

// Productos de respaldo (si no hay Google Sheet conectado)
const BACKUP_PRODUCTS = [
  {
    id: 1,
    nombre: "AUDÍFONOS INALÁMBRICOS X82 BLUETOOTH 5.3",
    sku: "KGD-AIX-3060",
    precio: 5.99,
    precioAnterior: 9.99,
    ventas: 120,
    categoria: "Audio y Sonido",
    imagen: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    descripcion: "Audífonos de alta definición con aislamiento pasivo de ruido y estuche recargable."
  },
  {
    id: 2,
    nombre: "AUDÍFONOS M10 PRO CON POWERBANK INTEGRADO",
    sku: "KGD-AIP-4172",
    precio: 4.99,
    precioAnterior: 8.50,
    ventas: 89,
    categoria: "Audio y Sonido",
    imagen: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
    descripcion: "Pantalla digital LED, resistencia al sudor e ideal para deportes."
  },
  {
    id: 3,
    nombre: "SOPORTE REFORZADO PARA TV 26-63 INCLINABLE",
    sku: "KGD-SDT-6816",
    precio: 6.25,
    precioAnterior: 10.00,
    ventas: 210,
    categoria: "Hogar y Tecnología",
    imagen: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80",
    descripcion: "Soporte universal ultra resistente. Soporta hasta 50kg."
  },
  {
    id: 4,
    nombre: "SMARTWATCH T800 ULTRA PANTALLA HD",
    sku: "KGD-SMT-9012",
    precio: 12.50,
    precioAnterior: 22.00,
    ventas: 340,
    categoria: "Relojes y Smartbands",
    imagen: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
    descripcion: "Notificaciones de WhatsApp, llamadas Bluetooth y medidor de ritmo cardíaco."
  },
  {
    id: 5,
    nombre: "SOPORTE DE AUTO PARA CELULAR MAGNÉTICO",
    sku: "KGD-AUT-1102",
    precio: 3.50,
    precioAnterior: 6.00,
    ventas: 155,
    categoria: "Accesorios para Auto",
    imagen: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&q=80",
    descripcion: "Imán de alta potencia para rejilla de ventilación, rotación 360 grados."
  },
  {
    id: 6,
    nombre: "MÁSCARA LED Y MASAJEADOR FACIAL BEAUTY",
    sku: "KGD-BEL-8820",
    precio: 15.00,
    precioAnterior: 25.00,
    ventas: 78,
    categoria: "Cuidado Personal y Belleza",
    imagen: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
    descripcion: "Tratamiento rejuvenecedor con fototerapia para piel y rostro."
  }
];

export default function App() {
  const [products, setProducts] = useState(BACKUP_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeLegalPage, setActiveLegalPage] = useState(null);

  // Conexión dinámica a Google Sheets en tiempo real
  useEffect(() => {
    if (!GOOGLE_SHEETS_CSV_URL) return;

    fetch(GOOGLE_SHEETS_CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const sheetProducts = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          const currentline = lines[i].split(',');
          const obj = {};
          
          headers.forEach((header, index) => {
            obj[header] = currentline[index] ? currentline[index].trim() : '';
          });

          sheetProducts.push({
            id: obj.id || i,
            nombre: obj.nombre,
            sku: obj.sku,
            precio: parseFloat(obj.precio) || 0,
            precioAnterior: parseFloat(obj.precioAnterior) || null,
            ventas: parseInt(obj.ventas) || 50,
            categoria: obj.categoria,
            imagen: obj.imagen,
            descripcion: obj.descripcion
          });
        }

        if (sheetProducts.length > 0) {
          setProducts(sheetProducts);
        }
      })
      .catch((err) => console.log('Cargando productos de respaldo:', err));
  }, []);

  const categories = ['Todos', ...new Set(products.map(p => p.categoria))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.categoria === selectedCategory;
    const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const cartTotal = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <Navbar 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenHelp={() => alert("Próximamente: Centro de Ayuda")}
        PHONE_NUMBER={WHATSAPP_PHONE}
      />

      <div className="flash-sale-banner">
        <div className="flash-sale-title">
          <Sparkles size={22} color="#a5b4fc" />
          <span>OFERTAS Y MÁS VENDIDOS</span>
        </div>
        <div style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={16} color="#818cf8" /> Precios especiales solicitando por WhatsApp
        </div>
      </div>

      <main className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onOpenDetail={setSelectedProduct}
          />
        ))}
      </main>

      <Footer 
        PHONE_NUMBER={WHATSAPP_PHONE}
        onOpenPage={(pageKey) => alert(`Abriendo sección: ${pageKey}`)} 
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        cartTotal={cartTotal}
        PHONE_NUMBER={WHATSAPP_PHONE}
      />

      {/* 4. COMPONENTE MODAL LEGAL INTEGRADO */}
      <LegalModal 
        pageKey={activeLegalPage}
        onClose={() => setActiveLegalPage(null)}
      />
    </div>
  );
}