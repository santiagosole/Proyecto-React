import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function CartWidget() {
  return (
    <div className="position-relative">
      <FaShoppingCart size={24} />
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        3
      </span>
    </div>
  );
}

export default CartWidget;
