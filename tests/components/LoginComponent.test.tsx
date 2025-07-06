import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import LoginComponent from "../../src/components/LoginComponent";

describe("Login Component", () => {
  it("displays the username and password inputs and the login button", () => {
    render(<LoginComponent />);

    expect(screen.getByRole("textbox", { name: "Username" })).toBeVisible();
    expect(screen.getByLabelText("Password")).toBeVisible();
    expect(screen.getByRole("button", { name: "Login" })).toBeVisible();
  });

  it("displays missing input error messages if a user submits without entering username and password", async () => {
    const user = userEvent.setup();

    render(<LoginComponent />);

    expect(
      screen.queryByText("Please input your username!"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please input your password!"),
    ).not.toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: "Login" });
    await user.click(loginButton);

    await waitFor(() =>
      expect(screen.getByText("Please input your username!")).toBeVisible(),
    );
    await waitFor(() =>
      expect(screen.getByText("Please input your password!")).toBeVisible(),
    );
  });

  it("displays invalid credentials message when the username is incorrect", async () => {
    const user = userEvent.setup();

    render(<LoginComponent />);

    expect(screen.queryByText("Invalid credentials")).not.toBeInTheDocument();

    const userNameInput = screen.getByRole("textbox", { name: "Username" });
    await user.type(userNameInput, "invalidUsername");

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "1234");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await user.click(loginButton);

    expect(screen.getByText("Invalid credentials")).toBeVisible();
  });

  it("displays invalid credentials message when the password is incorrect", async () => {
    const user = userEvent.setup();

    render(<LoginComponent />);

    expect(screen.queryByText("Invalid credentials")).not.toBeInTheDocument();

    const userNameInput = screen.getByRole("textbox", { name: "Username" });
    await user.type(userNameInput, "admin");

    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "invalidPassword");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await user.click(loginButton);

    expect(screen.getByText("Invalid credentials")).toBeVisible();
  });
});
