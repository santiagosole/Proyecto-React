import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
const productosIniciales = [
  {
    name: "Zapatilla Nike Air",
    price: 25000,
    imageUrl: "https://via.placeholder.com/150",
    category: "zapatillas",
  },
  {
    name: "Zapatilla Adidas Run",
    price: 21000,
    imageUrl: "https://via.placeholder.com/150",
    category: "zapatillas",
  },
  {
    name: "Remera Puma DryFit",
    price: 8500,
    imageUrl: "https://via.placeholder.com/150",
    category: "ropa",
  },
  {
    name: "Campera North Face",
    price: 48000,
    imageUrl: "https://via.placeholder.com/150",
    category: "ropa",
  },
  {
    name: "Mochila Reebok Training",
    price: 17000,
    imageUrl: "https://via.placeholder.com/150",
    category: "accesorios",
  },
];

const categoriasIniciales = [
  { name: "zapatillas" },
  { name: "ropa" },
  { name: "accesorios" },
];

function Agregar() {
  const [mensaje, setMensaje] = useState("");

  const subirDatos = async () => {
    try {
      const productosRef = collection(db, "productos");
      const categoriasRef = collection(db, "categorias");

      for (const producto of productosIniciales) {
        await addDoc(productosRef, producto);
      }

      for (const categoria of categoriasIniciales) {
        await addDoc(categoriasRef, categoria);
      }

      setMensaje("✅ ¡Productos y categorías subidos con éxito!");
    } catch (error) {
      setMensaje("❌ Error al subir: " + error.message);
    }
  };

  return (
    <div className="container my-5 text-center">
      <h2 className="mb-4">Cargar datos a Firestore</h2>
      <button className="btn btn-primary" onClick={subirDatos}>
        Subir productos y categorías
      </button>
      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
}

export default Agregar;
