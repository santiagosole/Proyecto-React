import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

function ItemDetail({ producto }) {
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{producto.nombre}</h2>
      <img
        src={producto.imageUrl}
        alt={producto.nombre}
        style={{ width: "300px" }}
      />
      <p>{producto.description}</p>
      <p>
        <strong>Precio:</strong> ${producto.precio}
      </p>

      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
        style={{ width: "50px" }}
      />

      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}

export default ItemDetail;
