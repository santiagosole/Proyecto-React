import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductos, getProductosByCategory } from "../../mockProductos";
import { CartContext } from "../../context/CartContext";

function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = categoryId
          ? await getProductosByCategory(categoryId)
          : await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

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
            <button onClick={() => addToCart(prod, 1)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
