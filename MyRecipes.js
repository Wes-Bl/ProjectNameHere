


//shows recipes user has created
function renderRecipes() {
    const tableBody = document.querySelector("#recipeTable tbody");
    tableBody.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${recipe.name}</td>
            <td>${recipe.ingredients.join(", ")}</td>
            <td>${recipe.instructions}</td>
            <td>
                <button onclick="deleteRecipe(${index})">X</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

//delete recipes functionality
function deleteRecipe(index) {
    if (confirm("Delete this recipe?")) {
        recipes.splice(index, 1);
        saveRecipes();
        renderRecipes();
    }
}

renderRecipes();