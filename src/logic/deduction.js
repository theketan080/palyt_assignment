export function deductIngredients(dish, stock) {
  return stock.map((stockItem) => {
    const recipeIngredient = dish.ingredients.find(
      (ingredient) => ingredient.name === stockItem.name
    );

    if (!recipeIngredient) {
      return stockItem;
    }

    const deduction = convertToStockUnit(
      recipeIngredient.qty,
      recipeIngredient.unit,
      stockItem.unit
    );

    return {
      ...stockItem,
      qty: Number((stockItem.qty - deduction).toFixed(3)),
    };
  });
}

function convertToStockUnit(quantity, recipeUnit, stockUnit) {
  if (recipeUnit === stockUnit) {
    return quantity;
  }

  if (recipeUnit === "g" && stockUnit === "kg") {
    return quantity / 1000;
  }

  if (recipeUnit === "kg" && stockUnit === "g") {
    return quantity * 1000;
  }

  if (recipeUnit === "ml" && stockUnit === "l") {
    return quantity / 1000;
  }

  if (recipeUnit === "l" && stockUnit === "ml") {
    return quantity * 1000;
  }

  return quantity;
}