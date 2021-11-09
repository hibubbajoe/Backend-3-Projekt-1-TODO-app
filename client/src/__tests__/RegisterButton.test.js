import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../pages/Register"

test('that Register page has a Register button', () => {
    render(<Register />);
    const button = screen.getByText("I want to sign up");
    expect(button).toBeInTheDocument();
})