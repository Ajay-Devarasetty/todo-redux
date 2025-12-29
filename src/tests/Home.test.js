import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Redux/Reducers/todoReducer";
import Home from "../Home";

const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      todo: todoReducer,
    },
  });

  return render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

describe("Todo App Tests", () => {
  test("renders todo heading", () => {
    renderWithStore();
    expect(screen.getByText(/To-Do Application/i)).toBeInTheDocument();
  });

  test("adds a new task", () => {
    renderWithStore();

    const input = screen.getByPlaceholderText("Enter Task");
    const saveButton = screen.getByText("Save");

    fireEvent.change(input, { target: { value: "Learn GitLab CI" } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Learn GitLab CI")).toBeInTheDocument();
  });

  test("edits a task", () => {
    renderWithStore();

    const input = screen.getByPlaceholderText("Enter Task");
    fireEvent.change(input, { target: { value: "Old Task" } });
    fireEvent.click(screen.getByText("Save"));

    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
  });

  test("deletes a task", () => {
    renderWithStore();

    const input = screen.getByPlaceholderText("Enter Task");
    fireEvent.change(input, { target: { value: "Delete Me" } });
    fireEvent.click(screen.getByText("Save"));

    fireEvent.click(screen.getByText("Delete"));

    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });
});
