import { useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

function Agregar() {
  useEffect(() => {
    const hasAdded = localStorage.getItem("productosAgregadosNoDup");
    if (hasAdded) return;

    const agregarProductos = async () => {
      try {
        const db = getFirestore();
        const itemsRef = collection(db, "items");

        // Obtener todos los productos existentes
        const snapshot = await getDocs(itemsRef);
        const productosExistentes = new Set();
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.name) productosExistentes.add(data.name.trim().toLowerCase());
        });

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
            name: "Gorra Negra Estilo Vans",
            price: 9200,
            category: "accesorios",
            imageUrl: "https://cdn.pixabay.com/photo/2017/08/06/00/04/baseball-cap-2587214_960_720.png",
            description: "Gorra negra clásica con visera curva. Estilo Vans.",
            stock: 15,
          },
          {
            name: "Mochila Adidas",
            price: 18000,
            category: "accesorios",
            imageUrl: "https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg",
            description: "Ideal para la escuela o el gimnasio.",
            stock: 14,
          },
        ];

        for (const producto of nuevosProductos) {
          const nombreNormalizado = producto.name.trim().toLowerCase();
          if (!productosExistentes.has(nombreNormalizado)) {
            await addDoc(itemsRef, producto);
            console.log(`✅ Producto agregado: ${producto.name}`);
          } else {
            console.log(`⚠️ Producto ya existe: ${producto.name}`);
          }
        }

        localStorage.setItem("productosAgregadosNoDup", "true");
        alert("Productos agregados sin duplicados.");
      } catch (error) {
        console.error("Error agregando productos:", error);
        alert("Error al agregar productos. Revisar consola.");
      }
    };

    agregarProductos();
  }, []);

  return <p className="text-center mt-5">⏳ Agregando productos a Firestore (sin duplicados)...</p>;
}

export default Agregar;
