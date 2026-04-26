// Fetch recipes from server
async function fetchServerRecipes() {
    try {
        const res = await fetch("http://localhost:3000/recipes");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch from server:", error);
        return []; // fallback if server is off
    }
}


// Render recipes to page
async function renderBrowseRecipes() {
    const recipes = await fetchServerRecipes();

    const tableBody = document.querySelector("#browseTable tbody");
    tableBody.innerHTML = ""; // clear existing rows

    recipes.forEach((recipe) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${recipe.name}</td>
            <td>${recipe.ingredients.join(", ")}</td>
            <td>${recipe.instructions}</td>
            <td>
                <button class="add-btn">Add</button>
            </td>
        `;

        // Add to My Recipes button
        row.querySelector(".add-btn").addEventListener("click", () => {
            addRecipeToStorage(recipe); // saves to localStorage
            alert("Recipe added to My Recipes");
        });

        tableBody.appendChild(row);
    });
}


// Initialize page on load
renderBrowseRecipes();