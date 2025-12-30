import {useParams} from "react-router"

const Detaill = () => {
  return (
    <>
      <header>
        <h2>DevJobs</h2>

        <nav>
          <a href="index.html">Inicio</a>
          <a href="EmpleosEjercicio1.html">Empleos</a>
          <a href="">Empresas</a>
          <a href="">Salario</a>
        </nav>

        <div>
          <div class="header-actions">
            <form role="search" aria-label="Buscar empleos">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-map-search"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5" />
                  <path d="M9 4v13" />
                  <path d="M15 7v5" />
                  <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M20.2 20.2l1.8 1.8" />
                </svg>
                <input type="text" placeholder="Buscar empleos" />
              </div>
            </form>
            <a href="">Subir CV</a>
          </div>
        </div>
      </header>

      <nav aria-label="Breadcrumb">
        <ol>
          <li>
            <a href="EmpleosEjercicio1.html">Empleos</a>
          </li>
          <li>Desarrollador de Aplicaciones Móviles</li>
        </ol>
      </nav>

      <main class="job-detail">
        <article class="prueba">
          <h1>Desarrollador de Aplicaciones Móviles</h1>
          <p>Mobile Apps Ltd. - Guadalajara</p>

          <button>Aplicar ahora</button>
        </article>

        <section>
          <h2>Descripción del puesto</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            atque beatae asperiores deleniti nihil, libero quibusdam
            necessitatibus, pariatur ad debitis reiciendis vel mollitia sint
            vitae? Saepe veritatis ab eveniet maxime? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nemo accusamus quam, similique cum
            ullam nihil laudantium neque quia nisi eos. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Aliquid obcaecati tempora ex
            cumque, accusamus optio, laborum laudantium commodi facilis libero
            possimus repellat, qui praesentium facere inventore voluptates rerum
            molestias exercitationem. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae aliquid culpa unde tenetur harum quas amet,
            repellat maiores perspiciatis tempore, consectetur veniam sunt ea
            nihil accusantium iusto incidunt officiis excepturi.
          </p>

          <h3 class="title-detail">Responsabilidades</h3>
          <ul class="list-detail">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
          </ul>

          <h3 class="title-detail">Requisitos</h3>
          <ul class="list-detail">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </li>
          </ul>

          <h3 class="title-detail">Acerca de la empresa</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, ea. Ducimus veniam ex aut quisquam enim, repellendus,
            magnam pariatur officia natus ut nemo odit at quam ratione, optio
            esse provident. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Maxime ullam aut laborum ipsum consequuntur? Corporis suscipit
            nihil earum, molestias, laborum repudiandae quaerat, impedit fugiat
            sunt ad reprehenderit veniam? Officiis, autem! Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Assumenda nulla eos magnam.
            Doloribus in ipsam reiciendis esse ab nam itaque, eos fuga
            praesentium eius laudantium dolorum quod laboriosam saepe impedit.
          </p>
        </section>

        <hr />
        <div class="footer-detail">
          <button>Aplicar ahora</button>
        </div>
      </main>
    </>
  );
};

export default Detaill;
