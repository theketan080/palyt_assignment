export function isDishAvailable(dish, stock) {
  return dish.ingredients.every((recipeIngredient) => {
    const stockIngredient = stock.find(
      (item) => item.name === recipeIngredient.name
    );

    // Ingredient required by recipe but missing from stock
    if (!stockIngredient) {
      return false;
    }

    const quantity = convertToBaseUnit(
      stockIngredient.qty,
      stockIngredient.unit
    );

    const par = convertToBaseUnit(
      stockIngredient.par,
      stockIngredient.unit
    );

    return quantity >= par;
  });
}

function convertToBaseUnit(quantity, unit) {
  if (unit === "kg") {
    return quantity * 1000;
  }

  if (unit === "g") {
    return quantity;
  }

  if (unit === "l") {
    return quantity * 1000;
  }

  if (unit === "ml") {
    return quantity;
  }

  return quantity;
}