let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function saveRecipes() {
    try {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    } catch (error) {
        console.error("Storage error:", error);
    }
}

async function getRecipes() {
    return recipes;
}

async function addRecipeToStorage(recipe) {
    recipes.push(recipe);
    saveRecipes();
}

 async function deleteRecipeFromStorage(index) {
    recipes.splice(index, 1);
    saveRecipes();
}