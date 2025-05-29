const productos = [
  {
    id: "1",
    name: "Mochila Azul",
    category: "mochilas",
    description: "Mochila azul reforzada",
    price: 25000,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: "2",
    name: "Campera Beige",
    category: "ropa",
    description: "Campera beige de cuero",
    price: 50000,
    imageUrl: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  },
  {
    id: "3",
    name: "Monitor Gamer",
    category: "tecnologia",
    description: "Monitor ideal para jugar",
    price: 80000,
    imageUrl: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  },
  {
    id: "4",
    name: "Saco Azul",
    category: "ropa",
    description: "Saco azul con botones",
    price: 45000,
    imageUrl: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
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
