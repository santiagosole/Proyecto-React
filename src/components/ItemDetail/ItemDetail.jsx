function ItemDetail({ producto }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>{producto.name}</h2>
      <img src={producto.imageUrl} alt={producto.name} style={{ width: '300px' }} />
      <p>{producto.description}</p>
      <p><strong>Precio:</strong> ${producto.price}</p>
      {}
    </div>
  );
}

export default ItemDetail;
