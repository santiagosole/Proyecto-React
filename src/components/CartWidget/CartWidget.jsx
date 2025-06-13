import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
  const { cartQuantity } = useContext(CartContext);

  return (
    <Link to="/cart" className="position-relative" style={{ color: "black", textDecoration: "none" }}>
      <FaShoppingCart size={24} />
      {cartQuantity() > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartQuantity()}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;
