import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

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

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const [orderId, setOrderId] = useState(null);
  const [stockAlert, setStockAlert] = useState("");

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();

    const newErrors = {
      nombre: buyer.nombre.trim().length >= 3 ? "" : "Ingrese un nombre válido.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email) ? "" : "Ingrese un email válido.",
      telefono: /^\d{7,15}$/.test(buyer.telefono) ? "" : "Ingrese un teléfono válido (solo números, sin espacios).",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (hasErrors) return;

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
        setBuyer({ nombre: "", email: "", telefono: "" });
        setErrors({ nombre: "", email: "", telefono: "" });
      })
      .catch((error) => {
        console.error("Error al registrar la compra:", error);
      });
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
    return <p className="pt-5 text-center">El carrito está vacío.</p>;
  }

  return (
    <div className="container pt-5" style={{ maxWidth: "800px" }}>
      <h2 className="text-center mb-4">Carrito de compras</h2>

      {stockAlert && (
        <div
          className="position-fixed top-0 end-0 bg-danger text-white p-3 rounded shadow"
          style={{ marginTop: "80px", zIndex: 1050 }}
        >
          {stockAlert}
        </div>
      )}

      <ul className="list-unstyled">
        {cart.map((prod) => (
          <li
            key={prod.id}
            className="mb-4 border rounded p-3 d-flex align-items-center gap-3 shadow-sm"
          >
            <img
              src={prod.imageUrl}
              alt={prod.title || prod.name}
              className="rounded"
              style={{ width: "100px", height: "auto" }}
            />
            <div className="flex-grow-1">
              <h4>{prod.title || prod.name}</h4>
              <div className="d-flex align-items-center gap-2 mb-2">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(prod.id)}>-</button>
                <span>{prod.cantidad}</span>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncreaseQuantity(prod)}>+</button>
              </div>
              <p>Precio unitario: ${prod.price.toLocaleString("es-AR")}</p>
              <p>Subtotal: ${(prod.price * prod.cantidad).toLocaleString("es-AR")}</p>
              <button className="btn btn-danger btn-sm" onClick={() => removeItem(prod.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total a pagar: ${total().toLocaleString("es-AR")} ARS</h3>
      <button className="btn btn-warning mb-4" onClick={clearCart}>Vaciar carrito</button>

      <form onSubmit={handleOrder} className="mb-5">
        <h4>Datos del comprador</h4>

        <div className="mb-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            onChange={handleChange}
            value={buyer.nombre}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            onChange={handleChange}
            value={buyer.email}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
            onChange={handleChange}
            value={buyer.telefono}
          />
          {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Confirmar compra</button>
      </form>

      {orderId && (
        <div className="alert alert-success" role="alert">
          ¡Gracias por tu compra! Tu ID de orden es: <strong>{orderId}</strong>
        </div>
      )}
    </div>
  );
}

export default Cart;
