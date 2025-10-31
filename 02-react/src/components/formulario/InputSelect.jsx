
export const InputSelect = ({ name, id, placeholder, options, value, onChange }) => {
  return (
    <select onChange={onChange} name={name} id={id} value={value || ""}>
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option, key) => {
        return (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
