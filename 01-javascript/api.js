//Seleccionamos el contenedor donde se agregarán los artículos
const containerArticles = document.querySelector(".jobs-listings");

if (!containerArticles) {
  throw new Error("No se encontró el contenedor .jobs-listings");
}

//Creamos la llamada a la API para obtener los datos del JSON
//Datos traidos de data.json

let jobsData = [];

function renderJobs(jobs) {
  containerArticles.innerHTML = "";

  jobs.forEach((job) => {
    const article = document.createElement("article");
    article.classList.add("job-listing-card");

    // Permite navegar a la página de detalle (Ejercicio 2)
    article.dataset.jobId = job.id;

    article.dataset.technology = job.data.technology;
    article.dataset.location = job.data.modalidad;
    article.dataset.experience = job.data.nivel;

    article.innerHTML = `
      <div>
        <h3>
          <a class="links_ofertas" href="OfertaEjercicio2.html?id=${encodeURIComponent(
            job.id
          )}">${job.titulo}</a>
        </h3>
        <small>${job.empresa} | ${job.ubicacion}</small>
        <p>${job.descripcion}</p>
      </div>
      <button class="button-apply-job">Aplicar</button>
    `;

    containerArticles.appendChild(article);
  });
}

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    // Guardamos los datos obtenidos y renderizamos una sola vez
    jobsData = jobs;
    window.jobsData = jobsData;
    renderJobs(jobsData);
  });
