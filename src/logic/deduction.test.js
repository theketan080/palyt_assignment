import { describe, expect, test } from "vitest";
import { deductIngredients } from "./deduction";

describe("deductIngredients", () => {
  test("deducts recipe quantity from stock", () => {
    const dish = {
      dish: "Chicken Biryani",
      ingredients: [
        {
          name: "Chicken",
          qty: 250,
          unit: "g",
        },
      ],
    };

    const stock = [
      {
        name: "Chicken",
        qty: 2,
        unit: "kg",
        par: 1,
      },
    ];

    const updatedStock = deductIngredients(dish, stock);

    expect(updatedStock[0].qty).toBe(1.75);
  });

  test("converts grams to kilograms correctly", () => {
    const dish = {
      dish: "Test Dish",
      ingredients: [
        {
          name: "Rice",
          qty: 180,
          unit: "g",
        },
      ],
    };

    const stock = [
      {
        name: "Rice",
        qty: 12,
        unit: "kg",
        par: 3,
      },
    ];

    const updatedStock = deductIngredients(dish, stock);

    expect(updatedStock[0].qty).toBe(11.82);
  });

  test("deducts millilitres correctly", () => {
    const dish = {
      dish: "Test Dish",
      ingredients: [
        {
          name: "Ghee",
          qty: 30,
          unit: "ml",
        },
      ],
    };

    const stock = [
      {
        name: "Ghee",
        qty: 800,
        unit: "ml",
        par: 200,
      },
    ];

    const updatedStock = deductIngredients(dish, stock);

    expect(updatedStock[0].qty).toBe(770);
  });

  test("does not change ingredients that are not part of the recipe", () => {
    const dish = {
      dish: "Test Dish",
      ingredients: [
        {
          name: "Chicken",
          qty: 250,
          unit: "g",
        },
      ],
    };

    const stock = [
      {
        name: "Chicken",
        qty: 2,
        unit: "kg",
        par: 1,
      },
      {
        name: "Paneer",
        qty: 1.4,
        unit: "kg",
        par: 0.5,
      },
    ];

    const updatedStock = deductIngredients(dish, stock);

    expect(updatedStock[0].qty).toBe(1.75);
    expect(updatedStock[1].qty).toBe(1.4);
  });
});