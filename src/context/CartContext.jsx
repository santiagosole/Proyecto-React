import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [stockMessage, setStockMessage] = useState("");

  const addToCart = (item, cantidad) => {
    const itemExistente = cart.find((prod) => prod.id === item.id);
    const cantidadActual = itemExistente ? itemExistente.cantidad : 0;
    const stockDisponible = item.stock || 0;

    if (cantidadActual + cantidad > stockDisponible) {
      setStockMessage(`No hay stock suficiente para "${item.name || item.title}".`);
      return;
    }

    setStockMessage(""); 

    if (itemExistente) {
      const cartActualizado = cart.map((prod) =>
        prod.id === item.id ? { ...prod, cantidad: prod.cantidad + cantidad } : prod
      );
      setCart(cartActualizado);
    } else {
      setCart([...cart, { ...item, cantidad }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter((prod) => prod.id !== id));
    setStockMessage(""); 
  };

  const clearCart = () => {
    setCart([]);
    setStockMessage(""); 
  };

  const totalQuantity = () =>
    cart.reduce((acc, prod) => acc + prod.cantidad, 0);

  const total = () =>
    cart.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);

  const increaseQuantity = (id) => {
    const producto = cart.find((prod) => prod.id === id);
    const stockDisponible = producto?.stock || 0;

    if (producto.cantidad + 1 > stockDisponible) {
      setStockMessage(`No hay más stock disponible para "${producto.name || producto.title}".`);
      return;
    }

    setStockMessage("");
    const updatedCart = cart.map((prod) =>
      prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const producto = cart.find((prod) => prod.id === id);
    const updatedCart = cart.map((prod) =>
      prod.id === id && prod.cantidad > 1
        ? { ...prod, cantidad: prod.cantidad - 1 }
        : prod
    );
    setCart(updatedCart);

    if (producto && producto.cantidad - 1 < producto.stock) {
      setStockMessage("");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clearCart,
        totalQuantity,
        total,
        increaseQuantity,
        decreaseQuantity,
        stockMessage,
        setStockMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
