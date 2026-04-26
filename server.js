const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(require("cors")());

// temporary in-memory storage
let recipes = [];

// GET all recipes
app.get("/recipes", (req, res) => {
    res.json(recipes);
});

// POST a recipe
app.post("/recipes", (req, res) => {
    const recipe = req.body;
    recipes.push(recipe);
    res.json({ message: "Recipe added" });
});

// DELETE a recipe
app.delete("/recipes/:index", (req, res) => {
    recipes.splice(req.params.index, 1);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});