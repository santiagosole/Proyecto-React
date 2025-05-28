import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ItemListContainer() {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => {
      const allProducts = [
        { id: "1", name: "Producto A", category: "cat1" },
        { id: "2", name: "Producto B", category: "cat2" },
        { id: "3", name: "Producto C", category: "cat1" },
      ];
      setTimeout(() => resolve(allProducts), 500);
    }).then((data) => {
      if (categoryId && categoryId !== "todos") {
        setProductos(data.filter((prod) => prod.category === categoryId));
      } else {
        setProductos(data);
      }
      setLoading(false);
    });
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2>Catálogo {categoryId ? ` - Categoría: ${categoryId}` : ""}</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemListContainer;
