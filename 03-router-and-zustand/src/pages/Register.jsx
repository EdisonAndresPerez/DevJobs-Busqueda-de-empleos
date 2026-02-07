import { NavLink } from "react-router";

const Register = () => {
  return (
    <>
      <main className="login">
        <header className="login__header">
          <h1>Crea una cuenta</h1>
          <h3>Regístrate para encontrar una gran oportunidad laboral</h3>
        </header>
        <section className="login__container">
          <form className="login__form" action="" method="post">
            <div className="login__field">
              <input
                className="login__input"
                id="login-email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="login__field">
              <input
                className="login__input"
                id="login-password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

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
            <div className="login__actions">
              <NavLink to="/login" className="login__secondary" type="button">
                Inicia sesion
              </NavLink>

            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Register;
