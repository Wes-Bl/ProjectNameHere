const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "recipes.json";

app.use(express.json());
app.use(require("cors")());

// load recipes from file
function loadRecipes() {
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// save recipes to file
function saveRecipes(recipes) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(recipes, null, 2));
}

// get all recipes
app.get("/recipes", (req, res) => {
    const recipes = loadRecipes();
    res.json(recipes);
});

// add a recipe
app.post("/recipes", (req, res) => {
    const recipes = loadRecipes();

    recipes.push(req.body);

    saveRecipes(recipes);

    res.json({ message: "Recipe added" });
});

// delete a recipe
app.delete("/recipes/:index", (req, res) => {
    const recipes = loadRecipes();

    recipes.splice(req.params.index, 1);

    saveRecipes(recipes);

    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});