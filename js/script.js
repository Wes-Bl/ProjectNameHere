let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function saveRecipes() {
    try {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    } catch (error) {
        console.error("Storage error:", error);
    }
}