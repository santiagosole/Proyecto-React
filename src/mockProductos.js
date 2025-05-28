const productos = [
  {
    id: "1",
    name: "Remera Azul",
    category: "ropa",
    description: "Remera azul de algodón 100%",
    price: 1500,
    imageUrl: "https://via.placeholder.com/150?text=Remera+Azul",
  },
  {
    id: "2",
    name: "Pantalón Negro",
    category: "ropa",
    description: "Pantalón negro de jean",
    price: 3000,
    imageUrl: "https://via.placeholder.com/150?text=Pantalon+Negro",
  },
  {
    id: "3",
    name: "Zapatillas Running",
    category: "calzado",
    description: "Zapatillas deportivas para correr",
    price: 5000,
    imageUrl: "https://via.placeholder.com/150?text=Zapatillas+Running",
  },
  {
    id: "4",
    name: "Gorra Negra",
    category: "accesorios",
    description: "Gorra ajustable negra",
    price: 800,
    imageUrl: "https://via.placeholder.com/150?text=Gorra+Negra",
  },
];

export function getProductos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 500);
  });
}

export function getProductoById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find((prod) => prod.id === id);
      if (producto) {
        resolve(producto);
      } else {
        reject("Producto no encontrado");
      }
    }, 500);
  });
}

export function getProductosByCategory(category) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = productos.filter((prod) => prod.category === category);
      resolve(filtered);
    }, 500);
  });
}
