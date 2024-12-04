import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import './Carrito.css'; // Importar el archivo CSS para los estilos

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false); // Estado para controlar el popup
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false); // Estado para controlar el popup de confirmación
  const [datosCompra, setDatosCompra] = useState({ nombre: '', tarjeta: '', correo: '' }); // Estado para los datos de compra
  const [errores, setErrores] = useState({}); // Estado para los errores de validación

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

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!datosCompra.nombre) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!datosCompra.tarjeta) nuevosErrores.tarjeta = 'La tarjeta es obligatoria';
    if (!datosCompra.correo) nuevosErrores.correo = 'El correo es obligatorio';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const procesarCompra = () => {
    if (validarCampos()) {
      setMostrarPopup(false); // Cerrar el popup de datos de compra
      setMostrarConfirmacion(true); // Mostrar el popup de confirmación
      setCarrito([]);
      localStorage.removeItem('carrito');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosCompra({ ...datosCompra, [name]: value });
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
          <button className="btn btn-success btn-comprar" onClick={() => setMostrarPopup(true)}>
            Comprar
          </button>
        </div>
      )}
      {mostrarPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Datos de Compra</h3>
            <label>
              Nombre:
              <input type="text" name="nombre" value={datosCompra.nombre} onChange={handleInputChange} />
              {errores.nombre && <p className="error">{errores.nombre}</p>}
            </label>
            <label>
              Tarjeta:
              <input type="text" name="tarjeta" value={datosCompra.tarjeta} onChange={handleInputChange} />
              {errores.tarjeta && <p className="error">{errores.tarjeta}</p>}
            </label>
            <label>
              Correo:
              <input type="email" name="correo" value={datosCompra.correo} onChange={handleInputChange} />
              {errores.correo && <p className="error">{errores.correo}</p>}
            </label>
            <button className="btn btn-success" onClick={procesarCompra}>
              Confirmar Compra
            </button>
            <button className="btn btn-secondary" onClick={() => setMostrarPopup(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {mostrarConfirmacion && (
        <div className="popup">
          <div className="popup-content">
            <h3>Compra Exitosa</h3>
            <p>Gracias por su compra. Se ha enviado un correo con los detalles de su pedido.</p>
            <button className="btn btn-primary" onClick={() => setMostrarConfirmacion(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
