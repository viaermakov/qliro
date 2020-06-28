import * as React from "react";
import cls from "classnames";

import styles from "./button.scss";

function Button({ type, onClick, children, className }) {
  const handleClick = (e) => {
    onClick && onClick(e);
  };

  return (
    <button
      className={cls(className, styles.button)}
      onClick={(handleClick)}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
