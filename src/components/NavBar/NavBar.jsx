import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav
      style={{
        backgroundColor: "#222",
        padding: "1rem",
        display: "flex",
        gap: "1.5rem",
        justifyContent: "center",
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Inicio
      </NavLink>

      <NavLink
        to="/productos"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Todos los productos
      </NavLink>

      <NavLink
        to="/categoria/zapatillas"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Zapatillas
      </NavLink>

      <NavLink
        to="/categoria/ropa"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Ropa
      </NavLink>

      <NavLink
        to="/categoria/accesorios"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Accesorios
      </NavLink>

      <NavLink
        to="/contacto"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Contacto
      </NavLink>

      <NavLink
        to="/cart"
        style={({ isActive }) => ({
          color: isActive ? "yellow" : "white",
          textDecoration: "none",
          fontWeight: "bold",
        })}
      >
        Carrito
      </NavLink>
    </nav>
  );
}

export default NavBar;
