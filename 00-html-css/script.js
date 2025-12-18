// Selecciona el boton por su ID
// En el documento HTML, asegurate de que el boton tenga el atributo id="aplicar"
const botonesAplicar = document.querySelectorAll(".button-apply-job");
console.log(botonesAplicar);

// Agrega un evento de click al boton
// Cuando se haga click, se mostrara una alerta
botonesAplicar.forEach((botonAplicar) => {
  botonAplicar.addEventListener("click", function () {
    botonAplicar.textContent = "Aplicado";
    botonAplicar.disable = true;
    botonAplicar.style.backgroundColor = "green";
    botonAplicar.style.cursor = "not-allowed";
  });
});
