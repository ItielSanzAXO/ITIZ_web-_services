import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Productos from './Productos';
import ProductosPage from './ProductosPage';
import Account from './Account';
import Contacto from './Contacto';
import Nosotros from './Nosotros';
import Carrito from './Carrito';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <Productos />
                <Contacto />
                <Nosotros />
                <div style={{ marginBottom: '2em' }}></div>
              </>
            }
          />
          <Route
            path="/productos"
            element={
              <>
                <Productos />
                <div style={{ marginBottom: '2em' }}></div>
              </>
            }
          />
          <Route
            path="/ProductosPage"
            element={
              <>
                <ProductosPage />
                <div style={{ marginBottom: '2em' }}></div>
              </>
            }
          />
          <Route
            path="/Account"
            element={
              <>
                <Account />
                <div style={{ marginBottom: '2em' }}></div>
              </>
            }
          />
          <Route path="/Carrito" element={<Carrito />} />
        </Routes>

        <footer
          style={{
            backgroundColor: 'green',
            color: 'white',
            textAlign: 'center',
            padding: '1em 0',
          }}
        >
          Copyright AxoPunk
        </footer>
      </Router>
    </div>
  );
}

export default App;
