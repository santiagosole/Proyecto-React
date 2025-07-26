import { useState } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

function Agregar() {
  const [estado, setEstado] = useState("");

  const handleAgregar = async () => {
    setEstado("Agregando productos...");
    const db = getFirestore();
    const itemsRef = collection(db, "items");

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
        imageUrl: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg", 
        description: "Zapatillas cómodas para uso diario.",
        stock: 12,
      },
      {
        name: "Zapatillas Nike  Running",
        price: 29000,
        category: "zapatillas",
        imageUrl: "https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg",
        description: "Ideales para correr o caminar.",
        stock: 10,
      },
      {
  name: "Zapatillas Puma Urban",
  price: 42000,
  category: "zapatillas",
  imageUrl: "https://images.pexels.com/photos/2759783/pexels-photo-2759783.jpeg",
  description: "Comodidad premium para correr o caminar.",
  stock: 11,
},
{
  name: "Zapatillas Converse Chuck Taylor",
  price: 28000,
  category: "zapatillas",
  imageUrl: "https://images.pexels.com/photos/3779499/pexels-photo-3779499.jpeg",
  description: "El clásico modelo atemporal para todos los días.",
  stock: 15,
},
{
  name: "Zapatillas Nike Golden Hour",
  price: 31000,
  category: "zapatillas",
  imageUrl: "https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg",
  description: "Combinación de estilo urbano y deportivo.",
  stock: 8,
},
{
  name: "Buzo Nike Sportswear",
  price: 24000,
  category: "ropa",
  imageUrl: "https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg",
  description: "Abrigo con diseño moderno y cómodo.",
  stock: 10,
},
{
  name: "Short Adidas Entrenamiento",
  price: 12000,
  category: "ropa",
  imageUrl: "https://images.pexels.com/photos/8041615/pexels-photo-8041615.jpeg",
  description: "Ideal para entrenamientos intensos.",
  stock: 20,
},
{
  name: "Camisa Oversize Urbana",
  price: 18000,
  category: "ropa",
  imageUrl: "https://images.pexels.com/photos/7562315/pexels-photo-7562315.jpeg",
  description: "Camisa casual de moda urbana.",
  stock: 7,
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
  name: "Gorra Nike Pro",
  price: 9500,
  category: "accesorios",
  imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/05/06/hat-1866573_960_720.jpg",
  description: "Gorra ajustable con tecnología de absorción.",
  stock: 18,
},
{
  name: "Mochila Puma Urbana",
  price: 21000,
  category: "accesorios",
  imageUrl: "https://images.pexels.com/photos/3757062/pexels-photo-3757062.jpeg",
  description: "Mochila resistente y con múltiples compartimentos.",
  stock: 9,
},
{
  name: "Riñonera Deportiva Negra",
  price: 7000,
  category: "accesorios",
  imageUrl: "https://images.pexels.com/photos/7328020/pexels-photo-7328020.jpeg",
  description: "Perfecta para salir a correr con lo justo.",
  stock: 16,
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

    let agregados = 0;

    for (const producto of nuevosProductos) {
      const nombreNormalizado = producto.name.trim().toLowerCase();
      if (!productosExistentes.has(nombreNormalizado)) {
        await addDoc(itemsRef, producto);
        productosExistentes.add(nombreNormalizado);
        agregados++;
      }
    }

    setEstado(`✅ Se agregaron ${agregados} productos nuevos sin duplicar.`);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Agregar productos a Firestore</h2>
      <button
        onClick={handleAgregar}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Agregar productos
      </button>
      {estado && <p style={{ marginTop: "1rem" }}>{estado}</p>}
    </div>
  );
}

export default Agregar;
