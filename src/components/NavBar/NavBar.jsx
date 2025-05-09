import React from "react";
import logo from "../../assets/logo.jpg";

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
        <a
          className="navbar-brand m-0 p-0"
          href="#"
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
        </a>
        <div className="ms-auto me-3 d-flex">
  <a className="nav-link mx-2" href="#">Inicio</a>
  <a className="nav-link mx-2" href="#">Productos</a>
  <a className="nav-link mx-2" href="#">Contacto</a>
</div>

      </div>
    </nav>
  );
}

export default NavBar;
