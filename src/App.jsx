import { useState } from "react";
import stockData from "./data/stock.json";
import recipesData from "./data/recipes.json";
import { isDishAvailable } from "./logic/availability";

function App() {
  const [stock, setStock] = useState(stockData);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [editQty, setEditQty] = useState("");
  const [editPar, setEditPar] = useState("");
  const [recipes] = useState(recipesData);

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

  return (
    <div>
      <h1>Kitchen Stock</h1>

      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Par Level</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {stock.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>

              {editingIngredient === item.name ? (
                <>
                  <td>
                    <input
                      type="number"
                      value={editQty}
                      onChange={(e) => setEditQty(e.target.value)}
                    />
                    {" "}{item.unit}
                  </td>

                  <td>
                    <input
                      type="number"
                      value={editPar}
                      onChange={(e) => setEditPar(e.target.value)}
                    />
                    {" "}{item.unit}
                  </td>

                  <td>
                    <button onClick={() => handleSave(item)}>
                      Save
                    </button>

                    <button onClick={handleCancel}>
                      Cancel
                    </button>
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
                    <button onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <hr/>
      <h2>Menu</h2>

<div>
  {recipes.map((dish) => {
    const available = isDishAvailable(dish, stock);

    return (
      <div key={dish.dish}>
        <h3>{dish.dish}</h3>

        <p>₹{dish.price}</p>

        <p>
          {available ? "AVAILABLE" : "UNAVAILABLE"}
        </p>
      </div>
    );
  })}
</div>
    </div>
  );
}

export default App;