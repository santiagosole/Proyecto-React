import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

function Cart() {
  const {
    cart,
    removeItem,
    clearCart,
    total,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const validarFormulario = () => {
    if (!nombre.trim() || !email.trim() || !telefono.trim()) {
      setError("Por favor, completa todos los campos del formulario.");
      return false;
    }
    return true;
  };

  const confirmarCompra = async () => {
    setError("");
    setSuccessMsg("");

    if (cart.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    const comprador = { nombre, email, telefono };
    const venta = {
      comprador,
      items: cart.map(({ id, title, name, cantidad, price }) => ({
        id,
        title: title || name,
        cantidad,
        price,
      })),
      fecha: Timestamp.fromDate(new Date()),
      total: total(),
      estado: "Pendiente",
    };

    try {
      const ventasCollection = collection(db, "ventas");
      const docRef = await addDoc(ventasCollection, venta);

      setSuccessMsg(`Compra registrada con éxito. ID: ${docRef.id}`);
      clearCart();

      setNombre("");
      setEmail("");
      setTelefono("");
    } catch (e) {
      console.error("Error al registrar la compra:", e);
      setError("Error al registrar la compra, intente nuevamente.");
    }

    setLoading(false);
  };

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
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button onClick={() => decreaseQuantity(prod.id)}>-</button>
                <span>{prod.cantidad}</span>
                <button onClick={() => increaseQuantity(prod.id)}>+</button>
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

      <h3>Datos del comprador</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          confirmarCompra();
        }}
        style={{ marginBottom: "1rem" }}
      >
        <div>
          <label>
            Nombre completo:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={loading}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Teléfono:
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              disabled={loading}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: "1rem" }}>
          {loading ? "Procesando compra..." : "Confirmar compra"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <button onClick={clearCart} disabled={loading}>
        Vaciar carrito
      </button>
    </div>
  );
}

export default Cart;

