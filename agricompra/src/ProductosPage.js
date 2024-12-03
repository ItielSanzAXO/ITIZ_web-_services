import React, { useEffect, useState } from 'react';
import './Productos.css';

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [productoAgregado, setProductoAgregado] = useState(null); // Estado para manejar el modal

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

    // Verificar si el producto ya está en el carrito
    const productoExistente = carritoActual.find(
      (item) => item.ID === producto.ID
    );

    if (productoExistente) {
      // Si el producto ya existe, solo aumentamos la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si el producto no existe, lo agregamos con cantidad 1
      producto.cantidad = 1;
      carritoActual.push(producto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carritoActual));

    console.log(`Producto agregado al carrito: ${producto.Nombre}`);

    // Mostrar el modal con la información del producto agregado
    setProductoAgregado(producto);

    // Cerrar el modal después de 3 segundos
    setTimeout(() => {
      setProductoAgregado(null);
    }, 3000);
  };

  return (
    <div>
      <h2>Todos los Productos</h2>
      {error && <p className="error">{error}</p>}
      
      {/* Modal que muestra el producto agregado */}
      {productoAgregado && (
        <div className="modal">
          <div className="modal-content">
            <h3>Producto Agregado al Carrito</h3>
            <p><strong>Producto:</strong> {productoAgregado.Nombre}</p>
            <p><strong>Precio:</strong> ${productoAgregado.Precio}</p>
            <p><strong>Cantidad:</strong> {productoAgregado.cantidad}</p>
            <button onClick={() => setProductoAgregado(null)} className="btn-close">
              Cerrar
            </button>
          </div>
        </div>
      )}

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
