import React, { useEffect, useState } from 'react';
import './Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cambiar la URL para apuntar a la ruta correcta en el servidor Express
    fetch('http://localhost:3000/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProductos(shuffled.slice(0, 6));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>Productos</h2>
      {error && <p className="error">{error}</p>}
      <div className="product-grid">
        {productos.map(producto => (
          <div className="product-card" key={producto.ID}>
            <img src={producto.ImagenURL} alt={producto.Nombre} />
            <h2>{producto.Nombre}</h2>
            <p>Descripción: {producto.Descripcion}</p>
            <p>Precio: ${producto.Precio}</p>
          </div>
        ))}
      </div>
      <a href="/ProductosPage" className="view-all-button">Ver todos los productos</a>
    </div>
  );
}

export default Productos;
