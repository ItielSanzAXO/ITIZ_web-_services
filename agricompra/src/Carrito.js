import React, { useEffect, useState } from 'react';

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

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.Precio, 0);
  };

  const procesarCompra = () => {
    alert('Compra procesada con éxito.');
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  return (
    <div className="shoppingCartContainer">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <table className="shoppingCartItemsContainer">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto, index) => (
              <tr key={index}>
                <td>{producto.Nombre}</td>
                <td>${producto.Precio}</td>
                <td>
                  <button
                    className="shoppingCartItemRemoveButton"
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
        <div className="shoppingCartTotalContainer">
          <h3>Total: ${calcularTotal()}</h3>
          <button className="shoppingCartItemBuyButton" onClick={procesarCompra}>
            Comprar
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
