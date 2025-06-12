import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoById } from "../../mockProductos";
import ItemDetail from "../ItemDetail/ItemDetail";

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductoById(id)
      .then((res) => {
        setProducto(res);
      })
      .catch((err) => {
        console.error("Error al obtener producto:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <ItemDetail producto={producto} />
  );
}

export default ItemDetailContainer;
