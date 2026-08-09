import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { AuthField } from "../components/auth/AuthField";

const Login = () => {
  const {  login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí harías la validación real con la API
    login(); // Actualiza el estado global
    navigate("/search"); // Redirige a empleos
  };

  return (
    <>
      <main className="login">
        <header className="login__header">
          <h1>Bienvenido</h1>
          <h3>Inicia sesión para encontrar una gran oportunidad laboral</h3>
        </header>
        <section className="login__container">
          <form onSubmit={handleSubmit}  className="login__form" action="" method="post">
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

            <p className="login__no-account">¿No tienes cuenta?</p>
            <div className="login__actions">
              <NavLink
                to="/register"
                className="login__secondary"
                type="button"
              >
                Crear cuenta para Desarrollador
              </NavLink>
              <button className="login__secondary" type="button">
                Crear cuenta para Empresa
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
