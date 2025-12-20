function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function setHtml(selector, html) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = html;
}

async function loadJobDetail() {
  const jobId = getQueryParam("id");

  if (!jobId) {
    setText("#jobTitle", "Oferta no encontrada");
    setText("#breadcrumbTitle", "Oferta no encontrada");
    return;
  }

  let jobs;
  try {
    const response = await fetch("./data.json");
    jobs = await response.json();
  } catch (error) {
    console.error("Error cargando data.json", error);
    setText("#jobTitle", "Error cargando oferta");
    setText("#breadcrumbTitle", "Error cargando oferta");
    return;
  }

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    setText("#jobTitle", "Oferta no encontrada");
    setText("#breadcrumbTitle", "Oferta no encontrada");
    return;
  }

  setText("#jobTitle", job.titulo);
  setText("#breadcrumbTitle", job.titulo);
  setText("#jobCompanyLocation", `${job.empresa} - ${job.ubicacion}`);
  setText("#jobDescription", job.descripcion);

  // Título de la pestaña
  document.title = `DevJobs - ${job.titulo}`;

  // Link "Aplicar ahora" opcional (si existe)
  setHtml(
    "#applyLink",
    `<a href="EmpleosEjercicio1.html">Volver a empleos</a>`
  );
}

document.addEventListener("DOMContentLoaded", loadJobDetail);
