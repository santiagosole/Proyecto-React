import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import ItemCard from "../ItemCard/ItemCard";

function ItemListContainer({ categoriaId }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const categoria = categoriaId || params.categoriaId || null;

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const productosRef = collection(db, "items");

    let q = productosRef;
    if (categoria) {
      q = query(productosRef, where("category", "==", categoria));
    }

    getDocs(q)
      .then((querySnapshot) => {
        const productosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      })
      .catch((error) => {
        console.error("Error al cargar productos: ", error);
      })
      .finally(() => setLoading(false));
  }, [categoria]);

  if (loading) return <p>Cargando productos...</p>;

  if (productos.length === 0)
    return <p>No se encontraron productos en esta categoría.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {productos.map((prod) => (
          <ItemCard key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
