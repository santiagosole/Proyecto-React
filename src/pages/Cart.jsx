import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart, totalPrice } = useContext(CartContext);

  if (cart.length === 0) return <p>Tu carrito está vacío.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Tu carrito</h2>
      {cart.map((prod) => (
        <div key={prod.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
          <h4>{prod.name}</h4>
          <p>Cantidad: {prod.cantidad}</p>
          <p>Precio unitario: ${prod.price}</p>
          <button onClick={() => removeFromCart(prod.id)}>Eliminar</button>
        </div>
      ))}
      <h3>Total: ${totalPrice()}</h3>
      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
}

export default Cart;
