



//Creamos la llamada a la API para obtener los datos del JSON
//Datos traidos de data.json
fetch('../01-javascript/data.json')
.then(response => {
    return response.json();
})
.then((data) => {
    data.forEach(data => {
        const article = document.createElement('article');
        article.classList.add('job-listing-card');

        article.dataset.technology = data.technology.toLowerCase();
        article.dataset.location = data.location.toLowerCase();
        article.dataset.experience = data.experience.toLowerCase();

        //Usaremos innerHTML para agregar el contenido al article
        article.innerHTML = ` 
         <article
          class="job-listing-card"
          data-technology="javascript"
          data-location="remoto"
          data-experience="mid"
        >
          <div>
            <h3>${data.title}</h3>
            <small>Tech Solutions Inc. | Remoto</small>
            <p>
              Buscamos un ingeniero de software con experiencia en desarrollo
              web y conocimientos en JavaScript, React y Node.js. El candidato
              ideal debe ser capaz de trabajar en equipo y tener buenas
              habilidades de comunicación.
            </p>
          </div>
          <button class="button-apply-job" id="boton-importante">
            Aplicar
          </button>
        </article>
        `
    })

})
