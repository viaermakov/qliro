import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Button from "./button";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("button should have same props", async () => {
  act(() => {
    render(<Button className='custom' type="submit">My button</Button>, container);
  });

  const button = screen.getByRole("button");
  
  expect(button.innerHTML).toBe("My button");
  expect(button.className).toBe("custom button");
  expect(button.type).toBe("submit");
});

test("button should call onClick", async () => {
  const onClick = jest.fn();

  act(() => {
    render(<Button type="submit" onClick={onClick} />, container);
  });

  const button = screen.getByRole("button");
  fireEvent.click(button, { bubbles: true });

  expect(onClick).toHaveBeenCalledTimes(1);
});
