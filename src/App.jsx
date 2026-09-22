import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartModal } from './components/CartModal';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { HeroBanner } from './components/HeroBanner';
import { WhatsAppButton } from './components/WhatsAppButton';
import { TrustBar } from './components/TrustBar';
import { ToastNotification } from './components/ToastNotification';
import { CookieBanner } from './components/CookieBanner';
import './App.css';

const WHATSAPP_PHONE = "593968291372"; 

// URL de tu Google Sheet publicado en formato CSV
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrujf2N_Fd52z_6BOXHbj_650jp_JyCIYEjyagtQbUO25Z5Yz6GSavmnsGQASN3WZ8Uyw6gqh4AgZm/pub?gid=0&single=true&output=csv"; 

// Productos de respaldo (con soporte para múltiples imágenes en arreglo)
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
    imagenes: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"],
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
    imagenes: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80"],
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
    imagenes: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80"],
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
    imagenes: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80"],
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
    imagenes: ["https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&q=80"],
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
    imagenes: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80"],
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
  const [toastMessage, setToastMessage] = useState(null);

  const handleScrollToProducts = () => {
    const mainSection = document.querySelector('.products-grid');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Conexión dinámica a Google Sheets en tiempo real con soporte para múltiples fotos
  // Conexión a Google Sheets con parser CSV estandarizado
// Conexión a Google Sheets con soporte ilimitado de imágenes
useEffect(() => {
  if (!GOOGLE_SHEETS_CSV_URL) return;

  fetch(GOOGLE_SHEETS_CSV_URL)
    .then((res) => res.text())
    .then((csvText) => {
      // Función para separar filas CSV manteniendo celdas con comillas
      const parseCSVLine = (line) => {
        const result = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
          } else {
            cur += char;
          }
        }
        result.push(cur.trim());
        return result;
      };

      const lines = csvText.split(/\r?\n/);
      if (lines.length < 2) return;

      const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/^"|"$/g, ''));
      const sheetProducts = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const currentline = parseCSVLine(lines[i]);
        const obj = {};
        
        headers.forEach((header, index) => {
          let val = currentline[index] ? currentline[index] : '';
          val = val.replace(/^"|"$/g, '');
          obj[header] = val;
        });

        const fallbackImg = "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80";
        let imgsArray = [];

        // Extraer TODAS las URLs válidas que comiencen por http/https separadas por comas o espacios
        if (obj.imagen && obj.imagen.trim() !== '') {
          imgsArray = obj.imagen
            .split(',')
            .map(u => u.trim().replace(/^"|"$/g, ''))
            .filter(u => u.startsWith('http'));
        }

        if (imgsArray.length === 0) {
          imgsArray = [fallbackImg];
        }

        if (obj.nombre) {
          sheetProducts.push({
            id: obj.id || i,
            nombre: obj.nombre,
            sku: obj.sku || `SKU-${i}`,
            precio: parseFloat(obj.precio) || 0,
            precioAnterior: parseFloat(obj.precioanterior || obj.precioAnterior) || null,
            ventas: parseInt(obj.ventas) || 50,
            categoria: obj.categoria || 'General',
            imagen: imgsArray[0],
            imagenes: imgsArray, // Ahora albergará 3, 4 o más imágenes
            descripcion: obj.descripcion || ''
          });
        }
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

    setToastMessage(product.nombre);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleRemoveFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const cartTotal = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      {/* 1. NAVBAR */}
      <Navbar 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenHelp={() => setActiveLegalPage('como-comprar')}
        PHONE_NUMBER={WHATSAPP_PHONE}
      />

      {/* 2. BARRA DE CONFIANZA */}
      <TrustBar PHONE_NUMBER={WHATSAPP_PHONE} />

      {/* 3. HERO BANNER PRINCIPAL */}
      <HeroBanner onExploreClick={handleScrollToProducts} />

      {/* 4. MAIN GRID DE PRODUCTOS */}
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

      {/* 5. FOOTER */}
      <Footer 
        PHONE_NUMBER={WHATSAPP_PHONE}
        onOpenPage={(pageKey) => setActiveLegalPage(pageKey)} 
      />

      {/* 6. BOTÓN FLOTANTE */}
      <WhatsAppButton PHONE_NUMBER={WHATSAPP_PHONE} />

      {/* 7. TOAST NOTIFICATION */}
      <ToastNotification 
        toastMessage={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />

      <CookieBanner onOpenPrivacy={(pageKey) => setActiveLegalPage(pageKey)} />

      {/* 8. MODALES */}
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

      <LegalModal 
        pageKey={activeLegalPage}
        onClose={() => setActiveLegalPage(null)}
      />
    </div>
  );
}