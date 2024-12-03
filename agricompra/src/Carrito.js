import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Cargar productos del carrito desde localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const eliminarProducto = (index) => {
    const carritoActualizado = carrito.filter((_, i) => i !== index);
    setCarrito(carritoActualizado);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  };

  const actualizarCantidad = (index, cantidad) => {
    const carritoActualizado = [...carrito];
    carritoActualizado[index].cantidad = cantidad;
    setCarrito(carritoActualizado);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  };

  const incrementarCantidad = (index) => {
    actualizarCantidad(index, carrito[index].cantidad + 1);
  };

  const decrementarCantidad = (index) => {
    if (carrito[index].cantidad > 1) {
      actualizarCantidad(index, carrito[index].cantidad - 1);
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.Precio * producto.cantidad, 0);
  };

  const procesarCompra = () => {
    alert('Compra procesada con éxito.');
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <p>El carrito está vacío.</p>
          <Link to="/productospage" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto, index) => (
              <tr key={index}>
                <td>{producto.Nombre}</td>
                <td>${producto.Precio}</td>
                <td>
                  <div className="cantidad-container">
                    <button
                      className="btn btn-secondary"
                      onClick={() => decrementarCantidad(index)}
                    >
                      -
                    </button>
                    <span className="cantidad">{producto.cantidad}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => incrementarCantidad(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarProducto(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {carrito.length > 0 && (
        <div className="total-container">
          <h3>Total: ${calcularTotal()}</h3>
          <button className="btn btn-success btn-comprar" onClick={procesarCompra}>
            Comprar
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
