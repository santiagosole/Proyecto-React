import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { CartContext } from "../../context/CartContext";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const db = getFirestore();
    const productoRef = doc(db, "items", id);

    getDoc(productoRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.warn("Producto no encontrado en Firestore para id:", id);
          setProducto(null);
        }
      })
      .catch((error) => {
        console.error("Error al obtener producto:", error);
        setProducto(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p style={{ paddingTop: "7rem", textAlign: "center" }}>
        Cargando detalle del producto...
      </p>
    );

  if (!producto)
    return (
      <p style={{ paddingTop: "7rem", textAlign: "center" }}>
        Producto no encontrado
      </p>
    );

  return <ItemDetail producto={producto} agregarAlCarrito={addItem} />;
}

export default ItemDetailContainer;
