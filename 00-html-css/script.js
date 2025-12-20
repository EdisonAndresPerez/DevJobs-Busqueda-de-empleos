// Selecciona el boton por su ID
// En el documento HTML, asegurate de que el boton tenga el atributo id="aplicar"
//const botonesAplicar = document.querySelectorAll(".button-apply-job");
//console.log(botonesAplicar);

// Agrega un evento de click al boton
// Cuando se haga click, se mostrara una alerta
//botonesAplicar.forEach((botonAplicar) => {
//  botonAplicar.addEventListener("click", function () {
//    botonAplicar.textContent = "Aplicado";
//    botonAplicar.disable = true;
//    botonAplicar.style.backgroundColor = "green";
//    botonAplicar.style.cursor = "not-allowed";
//  });
//});

//Forma correcta y actualizada
const jobsListings = document.querySelector(".jobs-listings");
//
jobsListings.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("button-apply-job")) {
    evento.target.textContent = "Aplicado";
    evento.target.disabled = true;
    evento.target.style.backgroundColor = "green";
    evento.target.style.cursor = "not-allowed";
  }

  console.log(evento.target.classList.contains("button-apply-job"));
});

document.addEventListener("click", (evento) => {
  const card = evento.target.closest?.(".job-listing-card");
  if (!card) return;

  if (card.id === "job-mobile") {
    console.log(
      "Haz hecho click en la tarjeta: Desarrollador de Aplicaciones Móviles"
    );
  }
});

//Filtar Tecnologia seleccionada en consola
//const filter = document.querySelector("#technology-jobs");
//filter.addEventListener("change", function () {
//  console.log(filter.value);
//});


//crear funcion para manejar los filtros
//usando delegeacion de eventos
const filtersDiv = document.querySelector("#filters");
filtersDiv.addEventListener("change", function (evento) {
  const filter = evento.target;

  if (filter.tagName == "SELECT") {
    console.log(`Filtro cambiado: ${filter.id} = ${filter.value}`);
  }
})
