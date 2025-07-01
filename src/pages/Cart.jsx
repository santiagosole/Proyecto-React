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
    stockMessage,
  } = useContext(CartContext);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [compraConfirmada, setCompraConfirmada] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orden = {
      comprador: { nombre, email },
      items: cart,
      total: total(),
      fecha: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "ventas"), orden);
      console.log("Compra registrada con ID:", docRef.id);
      clearCart();
      setCompraConfirmada(true);
      setNombre("");
      setEmail("");
    } catch (error) {
      console.error("Error al registrar la compra", error);
    }
  };

  if (cart.length === 0 && !compraConfirmada) {
    return <p className="text-center mt-5">El carrito está vacío.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Carrito de compras</h2>

      {stockMessage && (
        <div className="alert alert-danger text-center">{stockMessage}</div>
      )}

      {compraConfirmada && (
        <div className="alert alert-success text-center fw-bold">
          ¡Gracias por su compra y por confiar en nosotros!
        </div>
      )}

      <ul className="list-unstyled">
        {cart.map((prod) => (
          <li
            key={prod.id}
            className="mb-4 p-3 border rounded shadow d-flex flex-column flex-md-row align-items-center justify-content-between"
          >
            <img
              src={prod.imageUrl}
              alt={prod.title || prod.name}
              style={{ width: "100px", height: "auto", borderRadius: "8px" }}
              className="me-3"
            />
            <div className="flex-grow-1">
              <h5>{prod.title || prod.name}</h5>
              <div className="d-flex align-items-center mb-2">
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => decreaseQuantity(prod.id)}
                >
                  -
                </button>
                <span>{prod.cantidad}</span>
                <button
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={() => increaseQuantity(prod.id)}
                >
                  +
                </button>
              </div>
              <p className="mb-1">
                Precio unitario: ${prod.price.toLocaleString("es-AR")}
              </p>
              <p>
                Subtotal: $
                {(prod.price * prod.cantidad).toLocaleString("es-AR")}
              </p>
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => removeItem(prod.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h4 className="text-end">Total a pagar: ${total().toLocaleString("es-AR")} ARS</h4>

      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-warning me-2" onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h5 className="mb-3">Completar datos para confirmar compra</h5>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success w-100" type="submit">
          Confirmar compra
        </button>
      </form>
    </div>
  );
}

export default Cart;
