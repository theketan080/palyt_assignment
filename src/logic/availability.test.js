import { describe, expect, test } from "vitest";
import { isDishAvailable } from "./availability";

describe("isDishAvailable", () => {
  test("returns true when all ingredients are at or above par", () => {
    const dish = {
      dish: "Test Dish",
      ingredients: [
        {
          name: "Paneer",
          qty: 100,
          unit: "g",
        },
      ],
    };

    const stock = [
      {
        name: "Paneer",
        qty: 1,
        unit: "kg",
        par: 0.5,
      },
    ];

    expect(isDishAvailable(dish, stock)).toBe(true);
  });

  test("returns true when stock is exactly at par", () => {
    const dish = {
      dish: "Test Dish",
      ingredients: [
        {
          name: "Paneer",
          qty: 100,
          unit: "g",
        },
      ],
    };

    const stock = [
      {
        name: "Paneer",
        qty: 0.5,
        unit: "kg",
        par: 0.5,
      },
    ];

    expect(isDishAvailable(dish, stock)).toBe(true);
  });

  test("returns false when an ingredient falls below par", () => {
    const dish = {
      dish: "Test Dish",
      ingredients: [
        {
          name: "Paneer",
          qty: 100,
          unit: "g",
        },
      ],
    };

    const stock = [
      {
        name: "Paneer",
        qty: 0.4,
        unit: "kg",
        par: 0.5,
      },
    ];

    expect(isDishAvailable(dish, stock)).toBe(false);
  });

  test("returns false when a recipe ingredient is missing from stock", () => {
    const dish = {
      dish: "Test Dish",
      ingredients: [
        {
          name: "Cumin Seeds",
          qty: 5,
          unit: "g",
        },
      ],
    };

    const stock = [
      {
        name: "Paneer",
        qty: 1,
        unit: "kg",
        par: 0.5,
      },
    ];

    expect(isDishAvailable(dish, stock)).toBe(false);
  });
});