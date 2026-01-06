import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import snarkdown from "snarkdown";

import Link from "../components/Link";

import "./style.css";

function JobSection({ title, content }) {
  const html = snarkdown(content);

  return (
    <section className="detail-section">
      <h2 className="detail-sectionTitle">{title}</h2>

      <div
        className="detail-sectionContent prose"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  );
}

function DetailPageBreadCrumb({ job }) {
  return (
    <div className="detail-container">
      <nav className="detail-breadcrumb">
        <Link href="/search" className="detail-breadcrumbButton">
          Empleos
        </Link>
        <span className="detail-breadcrumbSeparator">/</span>
        <span className="detail-breadcrumbCurrent">{job.titulo}</span>
      </nav>
    </div>
  );
}

function DetailPageHeader({ job, isLoggedIn }) {
  return (
    <>
      <header className="detail-header">
        <h1 className="detail-title">{job.titulo}</h1>
        <p className="detail-meta">
          {job.empresa} · {job.ubicacion}
        </p>
      </header>

      <DetailApplyButton isLoggedIn={isLoggedIn} />
    </>
  );
}

function DetailApplyButton({ isLoggedIn }) {
  return (
    <button disabled={!isLoggedIn} className="detail-applyButton">
      {!isLoggedIn ? "Inicia sesión para aplicar" : "Aplicar ahora"}
    </button>
  );
}

export default function JobDetail({ isLoggedIn = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Oferta no encontrada");
        }

        return response.json();
      })
      .then((json) => {
        setJob(json);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-loading">
          <p className="detail-loadingText">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="detail-page">
        <div className="detail-error">
          <h2 className="detail-errorTitle">Oferta no encontrada</h2>
          {error && <p className="detail-errorText">{error}</p>}
          <button onClick={() => navigate("/")} className="detail-errorButton">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <DetailPageBreadCrumb job={job} />
      <DetailPageHeader job={job} isLoggedIn={isLoggedIn} />

      <JobSection
        title="Descripción del puesto"
        content={job.content.description}
      />
      <JobSection
        title="Responsabilidades"
        content={job.content.responsibilities}
      />
      <JobSection title="Requisitios" content={job.content.requirements} />
      <JobSection title="Acerca de la empresa" content={job.content.about} />
    </div>
  );
}
