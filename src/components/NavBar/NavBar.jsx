import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets//logo.jpg";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="d-flex align-items-center w-100 px-0">
        <Link
          className="navbar-brand m-0 p-0"
          to="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "80px",
              width: "auto",
              marginLeft: "0px",
              paddingLeft: "0px",
            }}
          />
        </Link>
        <div className="ms-auto me-3 d-flex">
          <Link className="nav-link mx-2" to="/">
            Inicio
          </Link>
          <Link className="nav-link mx-2" to="/productos">
            Productos
          </Link>
          <Link className="nav-link mx-2" to="/contacto">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
