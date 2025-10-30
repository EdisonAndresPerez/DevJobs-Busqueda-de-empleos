
export const InputSelect = ( {name, id, placeholder, options, onChange }) => {
  return (
    <select  onChange={onChange} name={name} id={id} defaultValue=""> 
      <option value="" disabled hidden>
        {placeholder}
      </option>

      {options.map((options, key) => {
        return (
          <option key={key} value={options.value}>
            {options.label}
          </option>
        );
      })}
    </select>
  );
};
