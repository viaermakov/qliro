import * as React from "react";
import cls from "classnames";

import styles from "./checkbox.scss";

function Checkbox({ className, onChange, isActive, name, id }) {
  return (
    <label className={cls(className, styles.checkbox)} id={id}>
      <span className={styles.labelText}>Change a door</span>
      <input
        type="checkbox"
        name={name}
        checked={isActive}
        onChange={onChange}
      />
      <svg
        width="32"
        height="32"
        viewBox="-4 -4 39 39"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className={styles.bg}
          width="35"
          height="35"
          x="-2"
          y="-2"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
          rx="6"
          ry="6"
        ></rect>
        <polyline
          className={styles.cm}
          points="4,14 12,23 28,5"
          stroke="transparent"
          strokeWidth="4"
          fill="none"
        ></polyline>
      </svg>
    </label>
  );
}

export default Checkbox;
