const Product = ({ product=[], showPrice, isSelected }) => {
  const handleSelected = () => {
    showPrice(product);
  };

  return (
    <div
      className={`product ${isSelected === product.id ? "selected" : ""} ${
        product.quantity < 1 ? "not-available" : ""
      }`}
      onClick={handleSelected}
    >
      <div className="product__name">{product.name}</div>
      <img
        className="product__image"
        src="/assets/img/bottle.png"
        alt={`product-${product.id}`}
      />
      <div className="product__price">
        {parseInt(product.price).toLocaleString()} THB
      </div>
      <div className="product__qty">
        {product.quantity > 0 ? (
          `Available: ${product.quantity}`
        ) : (
          <span className="text-danger">Not available</span>
        )}
      </div>
    </div>
  );
};

export default Product;
