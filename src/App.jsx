import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

function App() {
  return (
    <div>
      <NavBar />
      <h1 className="text-center mt-4">Bienvenido a mi tienda online</h1>
      <ItemListContainer />
    </div>
  );
}

export default App;
