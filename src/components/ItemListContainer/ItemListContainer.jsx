import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const productosRef = collection(db, "items");

    getDocs(productosRef)
      .then((querySnapshot) => {
        const productosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      })
      .catch((error) => {
        console.error("Error al cargar productos: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {productos.map((prod) => (
          <div
            key={prod.id}
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
              src={prod.imageUrl}
              alt={prod.name}
              style={{ width: "100%", height: "auto" }}
            />
            <h4>{prod.name}</h4>
            <p>${prod.price}</p>
            <button onClick={() => addToCart(prod, 1)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
