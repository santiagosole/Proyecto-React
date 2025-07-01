import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Cart() {
  const {
    cart,
    removeItem,
    clearCart,
    total,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [buyer, setBuyer] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const [orderId, setOrderId] = useState(null);
  const [stockAlert, setStockAlert] = useState("");

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (buyer.nombre && buyer.email && buyer.telefono) {
      const order = {
        buyer,
        items: cart,
        total: total(),
        date: new Date(),
      };

      const ventasRef = collection(db, "ventas");

      addDoc(ventasRef, order)
        .then((doc) => {
          setOrderId(doc.id);
          clearCart();
        })
        .catch((error) => {
          console.error("Error al registrar la compra:", error);
        });
    } else {
      alert("Por favor, completá todos los campos del formulario.");
    }
  };

  const handleIncreaseQuantity = (prod) => {
    if (prod.cantidad < prod.stock) {
      increaseQuantity(prod.id);
      setStockAlert(""); 
    } else {
      setStockAlert(`Superaste el stock disponible para "${prod.name || prod.title}"`);
      setTimeout(() => setStockAlert(""), 3000);
    }
  };

  if (cart.length === 0 && !orderId) {
    return <p style={{ paddingTop: "7rem", textAlign: "center" }}>El carrito está vacío.</p>;
  }

  return (
    <div style={{ padding: "2rem", paddingTop: "7rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Carrito de compras</h2>

      {stockAlert && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "#dc3545",
            color: "white",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          {stockAlert}
        </div>
      )}

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
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button onClick={() => decreaseQuantity(prod.id)}>-</button>
                <span>{prod.cantidad}</span>
                <button onClick={() => handleIncreaseQuantity(prod)}>+</button>
              </div>
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
      <button onClick={clearCart} style={{ marginRight: "1rem" }}>Vaciar carrito</button>

      <div style={{ marginTop: "2rem" }}>
        <h4>Datos del comprador</h4>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          value={buyer.nombre}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={buyer.email}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
          value={buyer.telefono}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <button onClick={handleOrder}>Confirmar compra</button>
      </div>

      {orderId && (
        <div style={{ marginTop: "2rem", color: "green", fontWeight: "bold" }}>
          ¡Gracias por tu compra! Tu ID de orden es: {orderId}
        </div>
      )}
    </div>
  );
}

export default Cart;