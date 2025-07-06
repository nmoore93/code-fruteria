import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Panel from "../../../src/components/Panel";

describe("Panel Component", () => {
  it("should display the passed in title", () => {
    render(<Panel title="Test Panel">Test Content</Panel>);

    expect(screen.getByText("Test Panel")).toBeVisible();
  });

  it("should display the passed in children", () => {
    render(
      <Panel title="Test Panel">
        <h2>Test Content</h2>
      </Panel>
    );

    expect(screen.getByText("Test Content")).toBeVisible();
  });
});
