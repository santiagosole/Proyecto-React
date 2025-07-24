import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function ItemCard({ producto }) {
  const { addItem } = useContext(CartContext);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "200px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={producto.imageUrl}
        alt={producto.name}
        style={{ width: "100%", height: "auto" }}
      />
      <h4>{producto.name}</h4>
      <p>${producto.price}</p>
      <button onClick={() => addItem(producto, 1)}>Agregar al carrito</button>
    </div>
  );
}

export default ItemCard;
