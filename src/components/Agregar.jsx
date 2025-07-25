import { useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Agregar() {
  useEffect(() => {
    const hasAdded = localStorage.getItem("productosAgregados");
    if (hasAdded) return;

    const db = getFirestore();
    const itemsRef = collection(db, "items");

   const nuevosProductos = [
  {
    name: "Zapatillas Nike Air Max",
    price: 32000,
    category: "zapatillas",
    imageUrl: "https://picsum.photos/seed/nikeairmax/300/300",
    description: "Zapatillas cómodas para uso diario.",
    stock: 12,
  },
  {
    name: "Zapatillas Puma Running",
    price: 29000,
    category: "zapatillas",
    imageUrl: "https://picsum.photos/seed/pumarunning/300/300",
    description: "Ideales para correr o caminar.",
    stock: 10,
  },
  {
    name: "Remera Adidas Clásica",
    price: 15000,
    category: "ropa",
    imageUrl: "https://picsum.photos/seed/adidasrem/300/300",
    description: "Remera cómoda y liviana.",
    stock: 20,
  },
  {
    name: "Campera Nike Deportiva",
    price: 38000,
    category: "ropa",
    imageUrl: "https://picsum.photos/seed/nikecampera/300/300",
    description: "Campera de abrigo con cierre.",
    stock: 8,
  },
  {
    name: "Gorra Vans",
    price: 9000,
    category: "accesorios",
    imageUrl: "https://picsum.photos/seed/vansgorra/300/300",
    description: "Gorra clásica con visera curva.",
    stock: 25,
  },
  {
    name: "Mochila Adidas",
    price: 18000,
    category: "accesorios",
    imageUrl: "https://picsum.photos/seed/adidassmochila/300/300",
    description: "Ideal para la escuela o el gimnasio.",
    stock: 14,
  },
];


    nuevosProductos.forEach(async (producto) => {
      await addDoc(itemsRef, producto);
    });

    localStorage.setItem("productosAgregados", "true");

    alert("Productos agregados correctamente. Ahora podés comentar o quitar esta ruta para evitar agregar de nuevo.");
  }, []);

  return <p className="text-center mt-5">⏳ Agregando productos a Firestore...</p>;
}

export default Agregar;
