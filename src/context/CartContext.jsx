import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, cantidad) => {
    const itemExistente = cart.find((prod) => prod.id === item.id);

    if (itemExistente) {
      const cartActualizado = cart.map((prod) =>
        prod.id === item.id ? { ...prod, cantidad: prod.cantidad + cantidad } : prod
      );
      setCart(cartActualizado);
    } else {
      setCart([...cart, { ...item, cantidad }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((prod) => prod.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = () =>
    cart.reduce((acc, prod) => acc + prod.cantidad, 0);

  const totalPrice = () =>
    cart.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
