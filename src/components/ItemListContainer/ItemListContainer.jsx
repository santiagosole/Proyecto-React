// src/components/ItemListContainer/ItemListContainer.jsx
import React from "react";
import mockProductos from "../../mockProductos";

function ItemListContainer({ greeting }) {
  return (
    <div className="container mt-5 pt-5">
      <h2>{greeting}</h2>
      <div className="row">
        {mockProductos.map((prod) => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={prod.image} className="card-img-top" alt={prod.name} />
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">${prod.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;

