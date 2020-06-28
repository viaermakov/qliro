import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Checkbox from "./checkbox";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("checkbox should call onChange", async () => {
  const onChange = jest.fn();

  act(() => {
    render(<Checkbox onChange={onChange} />, container);
  });

  const checkbox = document.querySelector("input");
  fireEvent.click(checkbox, { bubbles: true });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(checkbox.checked).toBe(true);
});

test("checkbox should change active state", async () => {
  act(() => {
    render(<Checkbox className="customClass" name="my checkbox" />, container);
  });

  const checkboxComponent = document.querySelector("label");
  const checkboxInputElement = document.querySelector("input");

  expect(checkboxComponent.className).toBe("customClass checkbox");
  expect(checkboxInputElement.name).toBe("my checkbox");
});
