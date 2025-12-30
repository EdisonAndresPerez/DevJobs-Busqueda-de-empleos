import { useState, useEffect } from "react";

//para saber la id de la ruta
import { useParams } from "react-router-dom";

const Detaill = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://jscamp-api.vercel.app/api/jobs/d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57${id}`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Error al obtener los datos del empleo");
        return response.json();
      })
      .then((json) => {
        setJob(json);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <>
      <h1>Detalle del empleo {id}</h1>
    </>
  );
};

export default Detaill;
