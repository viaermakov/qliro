import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axiosMock from "axios";
import Main from "./main";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("axios");

test("input field should be filled", async () => {
  act(() => {
    render(<Main />, container);
  });

  const input = document.querySelector("#experiments");
  fireEvent.change(input, { target: { value: "5" } });
  expect(input.value).toBe("5");
});

test("checkbox should be toggled after click", async () => {
  act(() => {
    render(<Main />, container);
  });

  const input = document.querySelector("#changed input");
  fireEvent.click(input, { bubbles: true });
  expect(input.checked).toBe(true);
});

test("checkbox should not be toggled", async () => {
  act(() => {
    render(<Main />, container);
  });

  const input = document.querySelector("#changed input");
  fireEvent.click(input, { bubbles: true });
  fireEvent.click(input, { bubbles: true });
  expect(input.checked).toBe(false);
});

test("should get data from api /result when all fields is filled ", async () => {
  act(() => {
    render(<Main />, container);
  });

  axiosMock.get.mockResolvedValueOnce({
    data: { chances: 0.66 },
  });

  const input = document.querySelector("#experiments");
  fireEvent.change(input, { target: { value: 5 }, bubbles: true });
  const checkbox = document.querySelector("#changed input");
  checkbox.click(checkbox, { bubbles: true });

  await act(async () => {
    fireEvent.click(screen.getByText("Try"));
  });

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(
    "http://localhost:3000/result?experiments=5&changed=true"
  );
  expect(document.querySelector("[data-testid='result']").innerHTML).toBe(
    "Chances to win 0.66%"
  );
});

test("should get data from api /result when all fields is filled ", async () => {
  act(() => {
    render(<Main />, container);
  });

  axiosMock.get.mockResolvedValueOnce({
    data: { error: "Service unavailable" },
  });

  const input = document.querySelector("#experiments");
  fireEvent.change(input, { target: { value: 5 }, bubbles: true });
  const checkbox = document.querySelector("#changed input");
  checkbox.click(checkbox, { bubbles: true });

  await act(async () => {
    fireEvent.click(screen.getByText("Try"));
  });

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(
    "http://localhost:3000/result?experiments=5&changed=true"
  );
  expect(document.querySelector("[data-testid='result']").innerHTML).toBe(
    "Service unavailable"
  );
});

test("should return data from api /result when experiments field is filled", async () => {
  act(() => {
    render(<Main />, container);
  });

  axiosMock.get.mockResolvedValueOnce({
    data: { chances: 0.33 },
  });

  const input = document.querySelector("#experiments");
  fireEvent.change(input, { target: { value: 5 }, bubbles: true });

  await act(async () => {
    fireEvent.click(screen.getByText("Try"));
  });

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(
    "http://localhost:3000/result?experiments=5"
  );
  expect(document.querySelector("[data-testid='result']").innerHTML).toBe(
    "Chances to win 0.33%"
  );
});

test("should not submit with empty experiments field", async () => {
  act(() => {
    render(<Main />, container);
  });

  axiosMock.get.mockResolvedValueOnce({
    data: { chances: 0.33 },
  });

  const checkbox = document.querySelector("#changed input");
  checkbox.click(checkbox, { bubbles: true });

  await act(async () => {
    fireEvent.click(screen.getByRole("button"));
  });
  expect(axiosMock.get).toHaveBeenCalledTimes(0);
});
