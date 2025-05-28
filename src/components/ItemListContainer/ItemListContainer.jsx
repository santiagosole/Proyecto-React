import React, { useEffect, useState } from "react";
import { getProductos } from "../../mockProductos";

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProductos().then((data) => setItems(data));
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <h2>{greeting}</h2>
      <div className="row">
        {items.map((prod) => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={prod.imageUrl}
                className="card-img-top"
                alt={prod.name}
              />
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
