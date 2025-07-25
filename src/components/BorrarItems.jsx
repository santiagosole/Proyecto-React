import React, { useState } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function BorrarItems() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const borrarColeccion = async () => {
    setLoading(true);
    setMensaje("");
    try {
      const db = getFirestore();
      const itemsRef = collection(db, "items");
      const snapshot = await getDocs(itemsRef);

      if (snapshot.empty) {
        setMensaje("La colección ya está vacía.");
        setLoading(false);
        return;
      }

      const borrados = snapshot.docs.map((documento) =>
        deleteDoc(doc(db, "items", documento.id))
      );

      await Promise.all(borrados);
      setMensaje("🗑️ Todos los documentos de 'items' fueron borrados correctamente.");
    } catch (error) {
      console.error("Error borrando la colección:", error);
      setMensaje("Error al borrar la colección. Revisá la consola.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button onClick={borrarColeccion} disabled={loading} style={{ padding: "10px 20px", fontSize: "16px" }}>
        {loading ? "Borrando..." : "Borrar toda la colección 'items'"}
      </button>
      {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
    </div>
  );
}

export default BorrarItems;
