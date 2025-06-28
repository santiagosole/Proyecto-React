import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, cantidad) => {
    const itemExistente = cart.find(prod => prod.id === item.id);

    if (itemExistente) {
      const nuevaCantidad = itemExistente.cantidad + cantidad;

      if (nuevaCantidad > item.stock) {
        alert("❌ No hay suficiente stock disponible.");
        return;
      }

      const cartActualizado = cart.map(prod =>
        prod.id === item.id ? { ...prod, cantidad: nuevaCantidad } : prod
      );
      setCart(cartActualizado);
    } else {
      if (cantidad > item.stock) {
        alert("❌ No hay suficiente stock disponible.");
        return;
      }

      setCart([...cart, { ...item, cantidad }]);
    }
  };

  const removeItem = id => {
    setCart(cart.filter(prod => prod.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalQuantity = () => cart.reduce((acc, prod) => acc + prod.cantidad, 0);

  const total = () =>
    cart.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);

  const increaseQuantity = (id) => {
    const producto = cart.find(prod => prod.id === id);
    if (!producto) return;

    if (producto.cantidad + 1 > producto.stock) {
      alert("❌ No hay suficiente stock disponible.");
      return;
    }

    const updatedCart = cart.map((prod) =>
      prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((prod) =>
      prod.id === id && prod.cantidad > 1
        ? { ...prod, cantidad: prod.cantidad - 1 }
        : prod
    );
    setCart(updatedCart);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
