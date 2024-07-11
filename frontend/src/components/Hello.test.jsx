import React from "react";
import { render } from "@testing-library/react";
import Hello from "./Hello";

describe("Hello component", () => {
    it("renders without crashing", () => {
        render(<Hello />);
    });

    it("renders the correct text", () => {
        const { getByTestId } = render(<Hello />);
        expect(getByTestId("login")).toHaveTextContent("Hello");
    });
});