import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Contacto from "./components/Contacto/Contacto";
import Productos from "./components/Productos/Productos";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer/Footer";
import Agregar from "./components/Agregar";
import BorrarItems from "./components/BorrarItems";

function App() {
  return (
    <CartProvider>
      <div id="root">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
            <Route path="/agregar-productos" element={<Agregar />} />
            <Route path="/borrar-items" element={<BorrarItems />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
