import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Productos from './Productos';
import ProductosPage from './ProductosPage';
import Account from './Account';
import Contacto from './Contacto';
import Nosotros from './Nosotros';

function App() {
  return (
    <Router>
      {/* Navbar siempre visible */}
      <Navbar />
      
      {/* Contenido dinámico basado en las rutas */}
      <Routes>
        <Route path="/" element={<>
          <Carousel />
          <Productos />
          <Contacto />
          <Nosotros />
        </>} />
        <Route path="/productos" element={<Productos />} /> {/* Asegúrate de que la ruta esté en minúsculas */}
        <Route path="/ProductosPage" element={<ProductosPage />} />
        <Route path="/Account" element={<Account/>} />
      </Routes>
    </Router>
  );
}

export default App;
