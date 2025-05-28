import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemDetailContainer() {
  const { productId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => {
      const productos = [
        { id: "1", name: "Producto A", description: "Descripción A" },
        { id: "2", name: "Producto B", description: "Descripción B" },
        { id: "3", name: "Producto C", description: "Descripción C" },
      ];
      setTimeout(() => resolve(productos.find((p) => p.id === productId)), 500);
    }).then((data) => {
      setProducto(data);
      setLoading(false);
    });
  }, [productId]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div>
      <h2>{producto.name}</h2>
      <p>{producto.description}</p>
    </div>
  );
}

export default ItemDetailContainer;
