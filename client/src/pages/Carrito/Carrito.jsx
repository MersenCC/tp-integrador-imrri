import React, { useState } from 'react';
import styles from './Carrito.module.css';

const productosEjemplo = [
  { id: 1, nombre: 'Pizza Margherita', precio: 8.5, cantidad: 1, fotoUrl: 'https://via.placeholder.com/150' },
  { id: 2, nombre: 'Pasta Alfredo', precio: 10.0, cantidad: 2, fotoUrl: 'https://via.placeholder.com/150' },
  { id: 3, nombre: 'Ensalada Cesar', precio: 6.5, cantidad: 1, fotoUrl: 'https://via.placeholder.com/150' },
];

const Carrito = () => {
  const [productos, setProductos] = useState(productosEjemplo);

  const calcularTotal = () => {
    return productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(producto => producto.id !== id);
    setProductos(nuevosProductos);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return;
    const nuevosProductos = productos.map(producto =>
      producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto
    );
    setProductos(nuevosProductos);
  };

  return (
    <div className={styles.container}>
      <h1>Carrito de Compras</h1>

      <div className={styles.productos}>
        {productos.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.id} className={styles.producto}>
              <img src={producto.fotoUrl} alt={producto.nombre} className={styles.imagenProducto} />
              <div className={styles.detallesProducto}>
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <div className={styles.cantidad}>
                  <button onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}>-</button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}>+</button>
                </div>
                <p>Total: ${(producto.precio * producto.cantidad).toFixed(2)}</p>
                <button className={styles.eliminar} onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>

      {productos.length > 0 && (
        <div className={styles.total}>
          <p>Total: ${calcularTotal()}</p>
        </div>
      )}

      <div className={styles.botones}>
        <button className={styles.btnComprar}>Seguir Comprando</button>
        <button className={styles.btnPagar}>Proceder al Pago</button>
      </div>
    </div>
  );
};

export default Carrito;
