import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoriaId } = useParams();

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const productosRef = collection(db, "items");

    const fetchData = async () => {
      try {
        let q;

        if (categoriaId) {
          q = query(productosRef, where("category", "==", categoriaId));
        } else {
          q = query(productosRef);
        }

        const querySnapshot = await getDocs(q);
        const productosFirebase = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosFirebase);
      } catch (error) {
        console.error("Error al cargar productos desde Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoriaId]);

  if (loading) return <p>Cargando productos...</p>;

  if (productos.length === 0) return <p>No se encontraron productos.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      {greeting && <h2>{greeting}</h2>}
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
            {}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
