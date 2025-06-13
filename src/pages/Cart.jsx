import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeItem, clearCart, total } = useContext(CartContext);

  if (cart.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Carrito de compras</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map((prod) => (
          <li
            key={prod.id}
            style={{
              marginBottom: "2rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={prod.imageUrl}
              alt={prod.title || prod.name}
              style={{ width: "100px", height: "auto", borderRadius: "8px" }}
            />
            <div>
              <h4>{prod.title || prod.name}</h4>
              <p>Cantidad: {prod.cantidad}</p>
              <p>Precio unitario: ${prod.price.toLocaleString("es-AR")}</p>
              <p>
                Subtotal: ${(prod.price * prod.cantidad).toLocaleString("es-AR")}
              </p>
              <button onClick={() => removeItem(prod.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total a pagar: ${total().toLocaleString("es-AR")} ARS</h3>
      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
}

export default Cart;
