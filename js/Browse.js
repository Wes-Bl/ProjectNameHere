// Fetch recipes from server
async function fetchServerRecipes() {
    try {
        // tries the Node server first
        const res = await fetch("http://localhost:3000/recipes");
        return await res.json();
    } catch (error) {
        console.warn("Server not available, loading local JSON");

        try {
            // fallback to local file
            const res = await fetch("recipes.json");
            return await res.json();
        } catch (err) {
            console.error("Failed to load local JSON:", err);
            return [];
        }
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
    <td class="recipeCont">${recipe.name}</td>
    <td class="recipeCont"><ul></ul></td>
`;

// build ingredient list
const ingredients = recipe.ingredients || [];

for (let i = 0; i < ingredients.length; i++) {
    row.innerHTML = row.innerHTML.substring(0, row.innerHTML.indexOf("</ul>"))
        + `<li>${ingredients[i]}</li>` + "</ul></td>";
}

row.innerHTML += `
    <td class="recipeCont" width="400">${recipe.instructions}</td>
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