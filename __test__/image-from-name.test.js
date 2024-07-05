import { createCanvas } from "canvas";
import { createImageFromName } from "../controller/image-from-name.js";

// Mock the canvas API
jest.mock("canvas", () => {
  const actualCanvas = jest.requireActual("canvas");
  return {
    ...actualCanvas,
    createCanvas: jest.fn().mockReturnValue({
      getContext: jest.fn().mockReturnValue({
        fillRect: jest.fn(),
        fillText: jest.fn(),
        fillStyle: "",
        font: "",
        textAlign: "",
        textBaseline: "",
      }),
      width: 100,
      height: 100,
    }),
  };
});

describe("createImageFromName", () => {
  it("should create an image with the first letter of the name", async () => {
    const name = "John";
    await createImageFromName(name);

    const canvas = createCanvas();
    const ctx = canvas.getContext("2d");

    expect(createCanvas).toHaveBeenCalledWith(100, 100);

    // Verify the fillRect call
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100);

    // Verify the properties were set correctly
    expect(ctx.fillRect.mock.calls[0][0]).toBe(0);
    expect(ctx.fillRect.mock.calls[0][1]).toBe(0);
    expect(ctx.fillRect.mock.calls[0][2]).toBe(100);
    expect(ctx.fillRect.mock.calls[0][3]).toBe(100);

    // Check the context after fillRect
    expect(ctx.fillStyle).toBe("#000");
    expect(ctx.font).toBe("bold 32px Arial");
    expect(ctx.textAlign).toBe("center");
    expect(ctx.textBaseline).toBe("middle");

    // Verify the fillText call
    expect(ctx.fillText).toHaveBeenCalledWith("J", 50, 50);
  });

  it("should handle an empty name", async () => {
    const name = "";
    await createImageFromName(name);

    const canvas = createCanvas();
    const ctx = canvas.getContext("2d");

    expect(ctx.fillText).toHaveBeenCalledWith("", 50, 50);
  });

  it("should handle a name with lowercase letters", async () => {
    const name = "alice";
    await createImageFromName(name);

    const canvas = createCanvas();
    const ctx = canvas.getContext("2d");

    expect(ctx.fillText).toHaveBeenCalledWith("A", 50, 50);
  });

  it("should handle a name with special characters", async () => {
    const name = "@lpha";
    await createImageFromName(name);

    const canvas = createCanvas();
    const ctx = canvas.getContext("2d");

    expect(ctx.fillText).toHaveBeenCalledWith("@", 50, 50);
  });
});
