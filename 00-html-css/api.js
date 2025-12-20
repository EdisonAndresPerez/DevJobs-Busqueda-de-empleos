//Seleccionamos el contenedor donde se agregarán los artículos
const containerArticles = document.querySelector(".jobs-listings");

if (!containerArticles) {
  throw new Error("No se encontró el contenedor .jobs-listings");
}

//Creamos la llamada a la API para obtener los datos del JSON
//Datos traidos de data.json
fetch("../01-javascript/data.json")
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    // Limpia los artículos actuales (evita duplicados si ya existen en el HTML)
    containerArticles.innerHTML = "";

    jobs.forEach((job) => {
      const article = document.createElement("article");
      article.classList.add("job-listing-card");

      // En tu JSON los datos están dentro de job.data y son strings (no funciones)
      article.dataset.technology = job.data.technology;
      article.dataset.location = job.data.modalidad;
      article.dataset.experience = job.data.nivel;

      // Usamos innerHTML para agregar el contenido al article
      article.innerHTML = `
        <div>
          <h3>${job.titulo}</h3>
          <small>${job.empresa} | ${job.ubicacion}</small>
          <p>${job.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>
      `;

      containerArticles.appendChild(article);
    });
  });
