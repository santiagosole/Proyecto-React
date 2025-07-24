import { useState, useEffect } from "react";
import ItemListContainer from "../ItemListContainer/ItemListContainer";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Productos() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const categoriasRef = collection(db, "categorias");

    getDocs(categoriasRef)
      .then((querySnapshot) => {
        const cats = querySnapshot.docs.map(doc => doc.data().name);
        setCategorias(cats);
      })
      .catch((error) => {
        console.error("Error al cargar categorías: ", error);
      });
  }, []);

  return (
    <div style={{ paddingTop: "100px", paddingLeft: "20px", paddingRight: "20px" }}>
      <h2>Productos</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCategoriaSeleccionada(null)}>Todas</button>
        {categorias.map((cat) => (
          <button
            key={cat}
            style={{ marginLeft: "10px" }}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ItemListContainer categoriaId={categoriaSeleccionada} />
    </div>
  );
}

export default Productos;
