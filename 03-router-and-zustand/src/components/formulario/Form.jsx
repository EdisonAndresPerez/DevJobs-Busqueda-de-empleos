import { useEffect, useState, useRef } from "react";

import { TECHNOLOGIES, LOCATIONS, EXPERIENCE_LEVELS } from "./form.constants";
import { SearchInput } from "./SearchInput";
import { InputSelect } from "./InputSelect";

export const Form = ({ filters, onFilterChange }) => {
  //guardar info de lo que el usuario escriba en tiempo real
  //se inicializa con el valor del filtro search
  const [searchDraft, setSearchDraft] = useState(filters.search || "");

  //ref para el timeout
  //guarda el ID del timeout
  const timeoutRef = useRef(null);

  //UseEffect para mantener el input sincronizado si el valor viene de afuera
  //sincroniza el estado externo con el interno
  useEffect(() => {
    setSearchDraft(filters.search || "");
  }, [filters.search]);

  //Debounce: guarda o dispara busqueda cada 500ms despues de dejar de escribir
  useEffect(() => {
    //se obtiene el valor actualmente aplicado en los filtros
    //se compara con lo que el usuario escribio
    const currentSearch = filters.search || "";
    if (searchDraft === currentSearch) return;

    // Limpia cualquier timeout previo para cancelar ejecuciones pendientes
    // y garantizar que solo el último input del usuario sea considerado.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Crea un nuevo timeout que aplicará el filtro después de 500ms
    // desde la última interacción del usuario.
    timeoutRef.current = setTimeout(() => {
      onFilterChange({ search: searchDraft });
    }, 500);

    // Cleanup del efecto:
    // Se ejecuta antes de volver a correr el efecto o al desmontar
    // el componente, evitando ejecuciones duplicadas y fugas de memoria.
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchDraft, filters.search, onFilterChange]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "search") {
      setSearchDraft(value); // escribe inmediato
      return;
    }

    // Selects: inmediato
    onFilterChange({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} id="empleos-search-form" role="search">
      <div className="search-bar">
        <SearchInput
          name="search"
          id="empleos-search-input"
          placeholder="Buscar trabajos, empresas o habilidades"
          value={searchDraft}
          onChange={handleInputChange}
        />
      </div>
      <div className="search-filters">
        <InputSelect
          name="technology"
          id="filter-technology"
          placeholder="Tecnologías Populares"
          options={TECHNOLOGIES}
          value={filters.technology}
          onChange={handleInputChange}
        />
        <InputSelect
          name="location"
          id="filter-location"
          placeholder="Ubicación"
          options={LOCATIONS}
          value={filters.location}
          onChange={handleInputChange}
        />
        <InputSelect
          name="experience-level"
          id="filter-experience-level"
          placeholder="Nivel de experiencia"
          options={EXPERIENCE_LEVELS}
          value={filters["experience-level"]}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};
