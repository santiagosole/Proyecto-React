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
      setError("Por favor, completá todos los campos del formulario.");
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

    if (!validarFormulario()) return;

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

      setSuccessMsg(`¡Gracias por su compra, ${nombre}! 🛍️
Tu ID de pedido es: ${docRef.id}
Gracias por confiar en nosotros ❤️`);

      clearCart();
      setNombre("");
      setEmail("");
      setTelefono("");
    } catch (e) {
      console.error("Error al registrar la compra:", e);
      setError("Ocurrió un error al registrar la compra. Intenta de nuevo.");
    }

    setLoading(false);
  };

  if (cart.length === 0 && !successMsg) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Carrito de compras</h2>

      {successMsg ? (
        <div
          style={{
            backgroundColor: "#d4edda",
            padding: "1rem",
            borderRadius: "8px",
            color: "#155724",
            marginTop: "1rem",
            whiteSpace: "pre-line",
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        >
          {successMsg}
        </div>
      ) : (
        <>
          <ul style={{ 
  listStyle: "none", 
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem"
}}>
  {cart.map((prod) => (
    <li
      key={prod.id}
      style={{
        width: "100%",
        maxWidth: "600px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        backgroundColor: "#fff"
      }}
    >
      <img
        src={prod.imageUrl}
        alt={prod.title || prod.name}
        style={{ width: "90px", borderRadius: "6px" }}
      />
      <div style={{ flex: 1, textAlign: "left" }}>
        <h4>{prod.title || prod.name}</h4>
        <p>Precio: ${prod.price.toLocaleString("es-AR")}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button onClick={() => decreaseQuantity(prod.id)}>-</button>
          <span>{prod.cantidad}</span>
          <button onClick={() => increaseQuantity(prod.id)}>+</button>
        </div>
        <p>Subtotal: ${(prod.price * prod.cantidad).toLocaleString("es-AR")}</p>
        <button onClick={() => removeItem(prod.id)}>Eliminar</button>
      </div>
    </li>
  ))}
</ul>


          <h3 style={{ marginTop: "2rem" }}>
            Total: ${total().toLocaleString("es-AR")} ARS
          </h3>

          <h4 style={{ marginTop: "2rem" }}>Datos del comprador</h4>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              confirmarCompra();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
              backgroundColor: "#f9f9f9",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 0 8px rgba(0,0,0,0.05)",
            }}
          >
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={loading}
              required
              style={{
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              style={{
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              disabled={loading}
              required
              style={{
                padding: "0.8rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.8rem",
                border: "none",
                backgroundColor: "#28a745",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {loading ? "Procesando..." : "Confirmar compra"}
            </button>
          </form>

          {error && (
            <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
          )}

          <button
            onClick={clearCart}
            style={{
              marginTop: "1rem",
              padding: "0.8rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
