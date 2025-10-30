import { TECHNOLOGIES, LOCATIONS, EXPERIENCE_LEVELS } from "./form.constants";
import { SearchInput } from "./SearchInput";
import { InputSelect } from "./InputSelect";

import { useState } from "react";

export const Form = () => {
  const [filter, setFilter] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;

    const newFilters = { ...filter, [name]: value };
    if(!value ) delete newFilters[name]
    setFilter(newFilters);
    console.log(newFilters)
  };

  return (
    <form id="empleos-search-form" role="search">
      <div className="search-bar">
        <SearchInput
          name="search"
          id="empleos-search-input"
          placeholder="Buscar trabajos, empresas o habilidades"
        />
      </div>

      <div className="search-filters">
        <InputSelect
          name="technology"
          id="filter-technology"
          placeholder="Tecnologías Populares"
          options={TECHNOLOGIES}
          onChange={onChange}
        />
        <InputSelect
          name="location"
          id="filter-location"
          placeholder="Ubicación"
          options={LOCATIONS}
          onChange={onChange}
        />
        <InputSelect
          name="experience-level"
          id="filter-experience-level"
          placeholder="Nivel de experiencia"
          options={EXPERIENCE_LEVELS}
          onChange={onChange}
        />
      </div>
    </form>
  );
};
