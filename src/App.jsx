import { useState } from "react";
import stockData from "./data/stock.json";
import recipesData from "./data/recipes.json";
import { isDishAvailable } from "./logic/availability";
import { deductIngredients } from "./logic/deduction";

function App() {
  const [stock, setStock] = useState(stockData);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [editQty, setEditQty] = useState("");
  const [editPar, setEditPar] = useState("");
  const [recipes] = useState(recipesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientQty, setNewIngredientQty] = useState("");
  const [newIngredientUnit, setNewIngredientUnit] = useState("g");
  const [newIngredientPar, setNewIngredientPar] = useState("");

  const handleEdit = (item) => {
    setEditingIngredient(item.name);
    setEditQty(item.qty);
    setEditPar(item.par);
  };

  const handleSave = (item) => {
    const updatedStock = stock.map((stockItem) => {
      if (stockItem.name === item.name) {
        return {
          ...stockItem,
          qty: Number(editQty),
          par: Number(editPar),
        };
      }

      return stockItem;
    });

    setStock(updatedStock);
    setEditingIngredient(null);
  };

  const handleCancel = () => {
    setEditingIngredient(null);
  };

  const handleOrder = (dish) => {
    const updatedStock = deductIngredients(dish, stock);

    setStock(updatedStock);
  };

  const handleAddIngredient = () => {
    const name = newIngredientName.trim();
    const quantity = Number(newIngredientQty);
    const par = Number(newIngredientPar);

    if (!name) {
      alert("Ingredient name is required");
      return;
    }

    if (newIngredientQty === "" || Number.isNaN(quantity) || quantity < 0) {
      alert("Quantity must be a valid non-negative number");
      return;
    }

    if (newIngredientPar === "" || Number.isNaN(par) || par < 0) {
      alert("Par level must be a valid non-negative number");
      return;
    }

    const ingredientExists = stock.some(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );

    if (ingredientExists) {
      alert("Ingredient already exists");
      return;
    }

    const newIngredient = {
      name,
      qty: quantity,
      unit: newIngredientUnit,
      par,
    };

    setStock([...stock, newIngredient]);

    setNewIngredientName("");
    setNewIngredientQty("");
    setNewIngredientUnit("g");
    setNewIngredientPar("");
  };

  const handleDeleteIngredient = (ingredient) => {
    const usedInRecipe = recipes.some((dish) =>
      dish.ingredients.some(
        (recipeIngredient) => recipeIngredient.name === ingredient.name,
      ),
    );

    if (usedInRecipe) {
      alert(
        `${ingredient.name} cannot be deleted because it is used in a recipe.`,
      );
      return;
    }

    const updatedStock = stock.filter(
      (stockItem) => stockItem.name !== ingredient.name,
    );

    setStock(updatedStock);
  };

  return (
    <div>
      <h1>Kitchen Stock</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Ingredient name"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
        />

        <input
          style={{ marginLeft: "20px" }}
          type="number"
          placeholder="Quantity"
          value={newIngredientQty}
          onChange={(e) => setNewIngredientQty(e.target.value)}
        />

        <select
          style={{ marginLeft: "20px" }}
          value={newIngredientUnit}
          onChange={(e) => setNewIngredientUnit(e.target.value)}
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
        </select>

        <input
          style={{ marginLeft: "20px" }}
          type="number"
          placeholder="Par level"
          value={newIngredientPar}
          onChange={(e) => setNewIngredientPar(e.target.value)}
        />

        <button style={{ marginLeft: "20px" }} onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>

      <input
        style={{ marginBottom: "20px" }}
        type="text"
        placeholder="Search ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table
        style={{
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "6px 10px" }}>S.No</th>
            <th style={{ padding: "6px 10px" }}>Ingredient</th>
            <th style={{ padding: "6px 10px" }}>Quantity</th>
            <th style={{ padding: "6px 10px" }}>Par Level</th>
            <th style={{ padding: "6px 10px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {stock
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((item, idx = 0) => (
              <tr key={item.name}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>

                {editingIngredient === item.name ? (
                  <>
                    <td>
                      <input
                        type="number"
                        value={editQty}
                        onChange={(e) => setEditQty(e.target.value)}
                      />{" "}
                      {item.unit}
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editPar}
                        onChange={(e) => setEditPar(e.target.value)}
                      />{" "}
                      {item.unit}
                    </td>

                    <td>
                      <button style={{ marginLeft: "5px" }} onClick={() => handleSave(item)}>Save</button>

                      <button style={{ marginLeft: "5px" }} onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {item.qty} {item.unit}
                    </td>

                    <td>
                      {item.par} {item.unit}
                    </td>

                    <td>
                      <button style={{ marginLeft: "5px" }} onClick={() => handleEdit(item)}>Edit</button>

                      <button style={{ marginLeft: "5px" }} onClick={() => handleDeleteIngredient(item)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <hr />
      <h2>Menu</h2>

      <div>
        {recipes.map((dish) => {
          const available = isDishAvailable(dish, stock);

          return (
            <div key={dish.dish}>
              <h3>{dish.dish}</h3>

              <p>₹{dish.price}</p>

              <p>{available ? "AVAILABLE" : "UNAVAILABLE"}</p>
              {available && (
                <button onClick={() => handleOrder(dish)}>Order</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
