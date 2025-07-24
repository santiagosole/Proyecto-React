function ItemDetail({ producto, agregarAlCarrito }) {
  return (
    <div className="container my-5 text-center">
      <h2>{producto.name}</h2>
      <img
        src={producto.imageUrl}
        alt={producto.name}
        style={{ maxWidth: "300px", borderRadius: "10px", marginBottom: "1rem" }}
      />
      <p><strong>Precio:</strong> ${producto.price.toLocaleString("es-AR")}</p>
      <p><strong>Categoría:</strong> {producto.category}</p>
      <button className="btn btn-primary mt-2" onClick={() => agregarAlCarrito(producto, 1)}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ItemDetail;
