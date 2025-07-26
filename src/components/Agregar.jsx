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
  name: "Zapatilla Merrell Brown",
  price: 24000,
  category: "zapatillas",
  imageUrl: "https://images.pexels.com/photos/40662/shoes-footwear-hiking-shoes-walking-40662.jpeg",
  description: "Calzado para tus momentos cotidianos.",
  stock: 10,
},
{
  name: "Zapatilla Angular Style",
  price: 12000,
  category: "zapatillas",
  imageUrl: "https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg",
  description: "Ideal para entrenamientos intensos.",
  stock: 20,
},
{
  name: "Remera Oversize Urbana",
  price: 18000,
  category: "ropa",
  imageUrl: "https://images.pexels.com/photos/18003707/pexels-photo-18003707.jpeg",
  description: "Camisa casual de moda urbana.",
  stock: 7,
},

      {
        name: "Remera Casual Clásica",
        price: 15000,
        category: "ropa",
        imageUrl: "https://images.pexels.com/photos/28489040/pexels-photo-28489040.jpeg",
        description: "Remera cómoda y liviana.",
        stock: 20,
      },
      {
        name: "Campera Fire Black",
        price: 38000,
        category: "ropa",
        imageUrl: "https://images.pexels.com/photos/16430970/pexels-photo-16430970.jpeg",
        description: "Campera de abrigo con cierre.",
        stock: 8,
      },
      {
  name: "Montgomery Grey Pro",
  price: 9500,
  category: "ropa",
  imageUrl: "https://images.pexels.com/photos/1206873/pexels-photo-1206873.jpeg",
  description: "Cubretodo para el otoño",
  stock: 5,
},
{
  name: "Bufanda Down Grade",
  price: 7000,
  category: "ropa",
  imageUrl: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg",
  description: "Bufanda incondicional para esos dias frescos",
  stock: 9,
},
{
  name: "Jeans Made In Home",
  price: 7000,
  category: "ropa",
  imageUrl: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
  description: "Ideales para esas salidas casuales.",
  stock: 16,
},

      {
        name: "Gorra Negra Estilo Vans",
        price: 9200,
        category: "accesorios",
        imageUrl: "https://images.pexels.com/photos/704857/pexels-photo-704857.jpeg",
        description: "Gorra negra clásica con visera plana. Estilo Vans.",
        stock: 15,
      },
      {
        name: "Mochila Adidas",
        price: 18000,
        category: "accesorios",
        imageUrl: "https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg",
        description: "Ideal para la escuela o el gimnasio.",
        stock: 3,
      },
      {
        name: "Bolso Silver Green",
        price: 18000,
        category: "accesorios",
        imageUrl: "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg",
        description: "Para llevar a todos lados",
        stock: 5,
      },
      {
        name: "Reloj Top Secret",
        price: 50000,
        category: "accesorios",
        imageUrl: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
        description: "Elegancia en tu muñeca",
        stock: 1,
      },
      {
        name: "Guantes Remote Red",
        price: 15000,
        category: "accesorios",
        imageUrl: "https://images.pexels.com/photos/45057/pexels-photo-45057.jpeg",
        description: "Protege tus manos del frio con estilo",
        stock: 10,
      },
      {
        name: "Anteojo See Better",
        price: 25000,
        category: "accesorios",
        imageUrl: "https://images.pexels.com/photos/39716/pexels-photo-39716.jpeg",
        description: "Miralo todo mejor",
        stock: 5,
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
