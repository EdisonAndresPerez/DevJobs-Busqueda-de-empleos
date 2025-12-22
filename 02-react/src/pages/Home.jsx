import { UseRouter } from "../hooks/useRouter";

export const Home = () => {
  const { navigate } = UseRouter();



  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");

    const url = searchTerm
      ? `/search?query=${encodeURIComponent(searchTerm)}`
      : "/search";

    navigate(url);
  };

  return (
    <>
      <main>
        <section>
          <img width="250px" src="background.webp" alt="Buscar trabajo" />
          <h1>Encuentra tu próximo empleo</h1>

          <p>
            Unete a la comunidad mas grande de desarrolladores y encuentra tu
            proxima oportunidad
          </p>

          <form role="search" onSubmit={handleSearch}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-map-search"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5" />
                <path d="M9 4v13" />
                <path d="M15 7v5" />
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M20.2 20.2l1.8 1.8" />
              </svg>
              <input
                name="search"
                type="text"
                placeholder="Buscar empleos por titulo, habilidades o empresa"
              />
              <button type="submit">Buscar</button>
            </div>
          </form>
        </section>

        <section>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            ¿Por qué DevJobs?
          </h2>
          <p style={{ display: " flex" }}>
            DevJobs es la principal bolsa de trabajo para desarrolladores.
            Conectamos a los desarrolladores con las mejores empresas del mundo.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
            porro eos numquam. A nisi iusto nihil provident, beatae tempora
            pariatur voluptatibus? Repudiandae eligendi unde quidem officia, in
            sequi nesciunt minus. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. A fugit et nisi, dolores totam corporis enim,
            deleniti sit magni eos cumque quo harum tenetur unde? Voluptates
            optio maxime voluptate consequuntur.
          </p>

          <footer>
            <article>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 13.478v4.522a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-4.522l.553 .277a20.999 20.999 0 0 0 18.897 -.002l.55 -.275zm-8 -11.478a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v2.242l-1.447 .724a19.002 19.002 0 0 1 -16.726 .186l-.647 -.32l-1.18 -.59v-2.242a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3h4zm-2 8a1 1 0 0 0 -1 1a1 1 0 1 0 2 .01c0 -.562 -.448 -1.01 -1 -1.01zm2 -6h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1z" />
              </svg>
              <h3>Encuentra el trabajo de tus sueños</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquid corporis incidunt ipsum suscipit. Asperiores maiores
                architecto odio tenetur esse deserunt, animi totam quae sit nemo
                nam aut dolorum blanditiis officia.
              </p>
            </article>

            <article>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-building-skyscraper"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 21l18 0" />
                <path d="M5 21v-14l8 -4v18" />
                <path d="M19 21v-10l-6 -4" />
                <path d="M9 9l0 .01" />
                <path d="M9 12l0 .01" />
                <path d="M9 15l0 .01" />
                <path d="M9 18l0 .01" />
              </svg>
              <h3>Conecta con las mejors empresas</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Inventore, deserunt! Libero optio dolores nulla. Repudiandae
                ducimus in exercitationem quaerat eos optio quos consequuntur
                consequatur, earum neque? Blanditiis, ipsa! Dolores,
                perferendis.
              </p>
            </article>

            <article>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-report-money"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                <path d="M12 17v1m0 -8v1" />
              </svg>
              <h3>Obten el salario que te mereces</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloribus optio, omnis laudantium quae possimus nam laboriosam
                placeat, eius repudiandae sed asperiores minus nemo provident
                molestiae excepturi iste ex totam ea.
              </p>
            </article>
          </footer>
        </section>
      </main>
    </>
  );
};

export default Home;
