# 🍽️ Palyt Engineering Intern Task

A restaurant **kitchen stock and menu management application** built using **React and Vite**.

The application connects kitchen stock with menu availability so that dishes automatically become unavailable when any ingredient falls below its configured par level.

---

## ✨ Features

### 🧑‍🍳 Kitchen Stock

- View all ingredients and their current quantities
- Search ingredients
- Add new ingredients
- Edit quantity and par level
- Delete ingredients
- Validation for stock inputs
- Prevent deletion of ingredients used by recipes

### 🍽️ Menu

- View all dishes and prices
- Automatically determine whether a dish is available
- A dish becomes unavailable when any required ingredient falls below its par level
- Missing recipe ingredients are treated as unavailable

### 🛒 Ordering

- Order an available dish
- Automatically deduct recipe ingredients from stock
- Handle recipe and stock unit conversions
- Recalculate menu availability after every order

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development and build tool |
| JavaScript | Application logic |
| Vitest | Automated testing |

---

## 📁 Project Structure

```text
src/
├── data/
│   ├── recipes.json
│   └── stock.json
├── logic/
│   ├── availability.js
│   ├── availability.test.js
│   ├── deduction.js
│   └── deduction.test.js
├── App.jsx
└── main.jsx
```

---

## 🚀 Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/theketan080/palyt_assignment.git
cd palyt_assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

---

## 🧪 Running Tests

Run the automated test suite with:

```bash
npm test
```

The project currently contains tests for:

- Dish availability
- Stock exactly at par level
- Stock below par level
- Missing recipe ingredients
- Ingredient deduction
- Gram-to-kilogram conversion
- Millilitre deduction
- Unused stock ingredients remaining unchanged

---

## 🌿 Git Workflow

Development was done on the `feature/palyt_assignment` branch with small, meaningful commits.

The final changes are intended to be submitted through a pull request:

```text
feature/palyt_assignment → main
```

The pull request will be kept open for review.

---

## 🧪 Current Test Result

```text
Test Files: 2 passed
Tests:      8 passed
```

---

## 🧠 Business Logic

### Dish Availability

A dish is considered **available** only when:

1. Every ingredient required by the recipe exists in stock.
2. The current quantity of every required ingredient is at or above its par level.

```text
Current Quantity >= Par Level
        ↓
     AVAILABLE
```

```text
Current Quantity < Par Level
        ↓
    UNAVAILABLE
```

For example:

```text
Chicken Stock = 1.25 kg
Chicken Par   = 1 kg

1.25 kg >= 1 kg
        ↓
Chicken Biryani remains AVAILABLE
```

If another order reduces the stock below the par level:

```text
Chicken Stock = 0.75 kg
Chicken Par   = 1 kg

0.75 kg < 1 kg
        ↓
Chicken Biryani becomes UNAVAILABLE
```

---

## 📦 Order & Stock Deduction

When an available dish is ordered:

```text
Order Dish
    ↓
Find Recipe
    ↓
Find Required Ingredients
    ↓
Convert Units
    ↓
Deduct Ingredients
    ↓
Update Stock
    ↓
Recalculate Menu Availability
```

For example:

```text
Stock:
Chicken = 2 kg

Recipe:
Chicken = 250 g
```

The recipe quantity is converted before deduction:

```text
250 g = 0.25 kg

2 kg - 0.25 kg
      ↓
   1.75 kg
```

Supported conversions:

- `g ↔ kg`
- `ml ↔ l`

---

# 📝 Design Decisions

## Missing Ingredients

Some recipes reference ingredients that are not present in the provided stock data, such as:

- Cumin Seeds
- Refined Flour

The application treats a dish as **unavailable** when any ingredient required by its recipe is missing from stock.

This prevents a dish from being shown as orderable when the application has no stock record for one of its required ingredients.

---

## Deleting Ingredients Used by Recipes

An ingredient cannot be deleted if it is referenced by any recipe.

For example:

```text
Paneer
   ↓
Used by Paneer Butter Masala
   ↓
Cannot be deleted
```

This prevents recipes from referencing ingredients that no longer exist in the stock list.

Ingredients that are not used by any recipe can be deleted.

---

## Unit Conversion

Stock and recipe quantities can use different units.

For example:

```text
Stock:
Chicken = 2 kg

Recipe:
Chicken = 250 g
```

The deduction logic converts the recipe quantity into the stock unit before performing the deduction.

Supported conversions:

```text
g  → kg
kg → g

ml → l
l  → ml
```

---

# ✅ Correctness Checks

The application was manually tested for the following flows:

- Editing ingredient stock quantities
- Changing par levels
- Verifying menu availability changes accordingly
- Ordering dishes
- Checking ingredient deductions after an order
- Confirming that dishes become unavailable when an ingredient falls below its par level
- Searching ingredients
- Adding ingredients
- Editing ingredients
- Deleting ingredients
- Preventing deletion of recipe-dependent ingredients
- Validating invalid stock values

Automated tests were also added for the core **availability** and **stock deduction** logic using Vitest.

---

# 🧪 Test Coverage

### Availability Tests

The following cases are covered:

- Stock above par → available
- Stock exactly at par → available
- Stock below par → unavailable
- Missing recipe ingredient → unavailable

### Deduction Tests

The following cases are covered:

- Deducting recipe quantity from stock
- Gram-to-kilogram conversion
- Millilitre deduction
- Keeping unused stock ingredients unchanged

---

# 🔮 Future Improvements

If this application were developed further, I would consider:

- Persisting stock changes using a backend/database
- Adding order history
- Adding authentication and role-based access
- Adding better user-facing error messages
- Adding inventory/restocking workflows
- Adding more comprehensive integration tests
- Adding UI/end-to-end tests
- Improving the overall UI and responsive design

---

## 👨‍💻 Author

**Ketan**

Built as part of the **Palyt Engineering Intern Task**.