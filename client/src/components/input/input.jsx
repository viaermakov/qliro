import * as React from "react";
import cls from "classnames";
import styles from "./input.scss";

const Input = ({
  id,
  name,
  value = "",
  type,
  placeholder,
  disabled,
  onChange,
  className,
  required,
  min
}) => {
  const [localValue, setLocalValue] = React.useState("");

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (event) => {
    const { value } = event.target;
    setLocalValue(value);
    onChange && onChange(value);
  };

  return (
    <div className={className}>
      <label htmlFor={id}>{name}</label>
      <input
        className={styles.input}
        id={id}
        name={name}
        type={type}
        min={min}
        value={localValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default Input;
