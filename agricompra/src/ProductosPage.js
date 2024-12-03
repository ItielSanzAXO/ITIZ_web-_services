import React, { useEffect, useState } from 'react';
import './Productos.css';

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data);
        localStorage.setItem('productos', JSON.stringify(data)); // Guardar todos los productos para usarlos en Carrito.js
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  const agregarAlCarrito = (producto) => {
    // Obtener los productos actuales del carrito
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el producto al carrito
    const carritoActualizado = [...carritoActual, producto];

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));

    console.log(`Producto agregado al carrito: ${producto.Nombre}`);
    alert(`${producto.Nombre} ha sido agregado al carrito.`);
  };

  return (
    <div>
      <h2>Todos los Productos</h2>
      {error && <p className="error">{error}</p>}
      <div className="product-grid">
        {productos.map((producto) => (
          <div className="product-card" key={producto.ID}>
            <img src={producto.ImagenURL} alt={producto.Nombre} />
            <h2>{producto.Nombre}</h2>
            <p>{producto.Descripcion}</p>
            <p>Precio: ${producto.Precio}</p>
            <button
              className="addToCart"
              data-item-id={producto.ID}
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductosPage;
