import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Input from "./input";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("Input should receive all props", async () => {
  act(() => {
    render(
      <Input
        type="number"
        name="my input"
        placeholder="my placeholder"
        disabled={true}
        required={true}
      />,
      container
    );
  });

  const input = document.querySelector("input");
  const inputWrapper = document.querySelector("div");
  const label = document.querySelector("label");
  expect(input.type).toBe("number");
  expect(label.innerHTML).toBe("my input");
  expect(input.name).toBe("my input");
  expect(input.placeholder).toBe("my placeholder");
  expect(input.disabled).toBe(true);
  expect(input.required).toBe(true);
});

test("input should call onChange", async () => {
  const onChange = jest.fn();

  act(() => {
    render(<Input onChange={onChange} />, container);
  });

  const input = document.querySelector("input");
  fireEvent.change(input, { target: { value: "example" }, bubbles: true });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(input.value).toBe("example");
});

test("input with type number should not call onChange by typing letters", async () => {
  const onChange = jest.fn();

  act(() => {
    render(<Input onChange={onChange} type="number" />, container);
  });

  const input = document.querySelector("input");
  fireEvent.change(input, { target: { value: "aa" }, bubbles: true });

  expect(onChange).toHaveBeenCalledTimes(0);
});

test("input with type number should call onChange by typing numbers", async () => {
  const onChange = jest.fn();

  act(() => {
    render(<Input onChange={onChange} type="number" />, container);
  });

  const input = document.querySelector("input");
  fireEvent.change(input, { target: { value: "5" }, bubbles: true });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(input.value).toBe("5");
});
