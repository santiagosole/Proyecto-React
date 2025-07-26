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

  const [buyer, setBuyer] = useState({ nombre: "", email: "", telefono: "" });
  const [orderId, setOrderId] = useState(null);
  const [stockAlert, setStockAlert] = useState("");
  const [showResumen, setShowResumen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!buyer.nombre || !buyer.email || !buyer.telefono) {
      alert("Por favor, completá todos los campos del formulario.");
      return;
    }

    const totalPagado = total();

    const order = {
      buyer,
      items: cart,
      total: totalPagado,
      date: new Date(),
    };

    const ventasRef = collection(db, "ventas");

    addDoc(ventasRef, order)
      .then((doc) => {
        setOrderId(doc.id);
        setOrderDetails({ items: cart, total: totalPagado });
        clearCart();
        setShowResumen(true);
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
      setStockAlert(`Stock máximo para "${prod.name}"`);
      setTimeout(() => setStockAlert(""), 3000);
    }
  };

  if (cart.length === 0 && !orderId) {
    return <p className="text-center mt-5">🛒 El carrito está vacío.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛍️ Carrito de compras</h2>

      {stockAlert && (
        <div className="alert alert-danger text-center">{stockAlert}</div>
      )}

      {!showResumen ? (
        <>
          {cart.map((prod) => (
            <div key={prod.id} className="card mb-3">
              <div className="card-body d-flex gap-3 align-items-center">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="img-fluid"
                  style={{ width: "100px", borderRadius: "8px" }}
                />
                <div>
                  <h5>{prod.name}</h5>
                  <p>Precio unitario: ${prod.price}</p>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => decreaseQuantity(prod.id)}
                    >
                      -
                    </button>
                    <span>{prod.cantidad}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleIncreaseQuantity(prod)}
                    >
                      +
                    </button>
                  </div>
                  <p>Subtotal: ${prod.price * prod.cantidad}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(prod.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}

          <h4>Total a pagar: ${total().toLocaleString("es-AR")}</h4>
          <button className="btn btn-warning me-2" onClick={clearCart}>
            Vaciar carrito
          </button>

          <hr className="my-4" />

          <h4>Datos del comprador</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                name="nombre"
                placeholder="Nombre"
                value={buyer.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={buyer.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                name="telefono"
                placeholder="Teléfono"
                value={buyer.telefono}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn-success" onClick={handleOrder}>
            Confirmar compra
          </button>
        </>
      ) : (
        <div className="alert alert-success mt-4">
          <h4>¡Gracias por tu compra!</h4>
          <p>
            ID de la orden: <strong>{orderId}</strong>
          </p>
          <p>
            👤 Comprador: {buyer.nombre} - {buyer.email} - {buyer.telefono}
          </p>
          <hr />
          <h5>Resumen de productos:</h5>
          {orderDetails && (
            <>
              <ul className="list-group mb-3">
                {orderDetails.items.map((prod, idx) => (
                  <li key={idx} className="list-group-item">
                    {prod.name} x{prod.cantidad} = ${prod.price * prod.cantidad}
                  </li>
                ))}
              </ul>
              <p className="fw-bold fs-5">
                💰 Total pagado: ${orderDetails.total.toLocaleString("es-AR")}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
