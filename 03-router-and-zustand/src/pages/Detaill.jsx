import { useParams } from "react-router";

const Detaill = () => {
  const { id } = useParams();

  return (
    <>
      <h1>Detalle del empleo {id}</h1>
    </>
  );
};

export default Detaill;
