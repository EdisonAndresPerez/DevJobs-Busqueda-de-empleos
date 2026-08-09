import { NavLink, useNavigate } from "react-router";
import Link from "../components/Link";
import { AuthField } from "../components/auth/AuthField";
import "../pages/style.css";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/search");
  };

  return (
    <>
      <main className="login">
        <header className="login__header">
          <h1>Crea una cuenta</h1>
          <h3>Regístrate para encontrar una gran oportunidad laboral</h3>
        </header>
        <section className="login__container">
          <form
            onSubmit={handleSubmit}
            className="login__form"
            action=""
            method="post"
          >
            <div className="login__fields-row">
              <AuthField
                id="login-firstname"
                name="firstname"
                type="text"
                placeholder="Escribe tu nombre"
                autoComplete="given-name"
                required
              />

              <AuthField
                id="login-lastname"
                name="lastname"
                type="text"
                placeholder="Escribe tu apellido"
                autoComplete="family-name"
                required
              />
            </div>

            <AuthField
              id="login-email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />

            <AuthField
              id="login-password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />

            <div className="options">
              <label className="remember">
                <input type="checkbox" />
                Recordar cuenta
              </label>

              <a href="#" className="forgot">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button>Iniciar sesión</button>

            <p className="login__no-account">¿Ya tienes cuenta?</p>
            <Link href="/login" className="login__secondary" type="button">
              Inicia sesion
            </Link>
          </form>
        </section>
      </main>
    </>
  );
};

export default Register;
