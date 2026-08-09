export const AuthField = ({
  id,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
}) => {
  return (
    <div className="login__field">
      <input
        className="login__input"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
};
