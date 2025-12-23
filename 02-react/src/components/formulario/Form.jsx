import { TECHNOLOGIES, LOCATIONS, EXPERIENCE_LEVELS } from "./form.constants";
import { SearchInput } from "./SearchInput";
import { InputSelect } from "./InputSelect";

let letterRandomInput = Math.random();
export const Form = ({ filters, onFilterChange }) => {

  //creamos una variable de prueba  para ver como se rendereiza el input
  
  // Actualiza el filtro en tiempo real
  const handleInputChange = (event) => {
    //console.log para imprimir
    console.log(letterRandomInput);
    const { name, value } = event.target;
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
          value={filters.search}
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
