import { NavLink } from "react-router";
import Link from "../Link";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";


export const Header = () => {

  const { isLoggedIn, login, logout } = useContext(AuthContext);


  return (
    <header>
      <h1>
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        <Link style={{ textDecoration: "none", color: "inherit" }} href="/">
          DevJobs
        </Link>
      </h1>

      <nav>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "nav__link nav__link--active" : "nav__link"
          }
        >
          Empleos
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav__link nav__link--active" : "nav__link"
          }
        >
          Iniciar Sesión
        </NavLink>

        {isLoggedIn ? (
          <button type="button" onClick={logout}>
            Cerrar sesion
          </button>
        ) : (
          <button type="button" onClick={login}>
            simulador login
          </button>
        )}
      </nav>
    </header>
  );
};
