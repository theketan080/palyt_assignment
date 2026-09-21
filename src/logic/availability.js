export function isDishAvailable(dish, stock) {
  return dish.ingredients.every((recipeIngredient) => {
    const stockIngredient = stock.find(
      (item) => item.name === recipeIngredient.name
    );

    if (!stockIngredient) {
      return false;
    }

    return isAboveOrAtPar(stockIngredient);
  });
}

function isAboveOrAtPar(stockIngredient) {
  const quantityInBaseUnit = convertToBaseUnit(
    stockIngredient.qty,
    stockIngredient.unit
  );

  const parInBaseUnit = convertToBaseUnit(
    stockIngredient.par,
    stockIngredient.unit
  );

  return quantityInBaseUnit >= parInBaseUnit;
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