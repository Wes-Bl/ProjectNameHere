


//shows recipes user has created
async function renderRecipes() {
    const recipes = await getRecipes();
    const tableBody = document.querySelector("#recipeTable tbody");
    tableBody.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class=\"recipeCont\">${recipe.name}</td>
            <td class=\"recipeCont\"><ul></ul></td>`;
            
            const ingredients = recipe.ingredients || [];

            for(let i = 0; i < ingredients.length; i++){
                row.innerHTML = row.innerHTML.substring(0, row.innerHTML.indexOf("</ul>"))
                 + `<li>${ingredients[i]}</li>` + "</ul></td>";
            }
    
        row.innerHTML += `
            <td class=\"recipeCont\" width=\"400\">${recipe.instructions}</td>
            <td>
                <button onclick="deleteRecipe(${index})">X</button>
                <button class="add-btn" onclick="uploadSingleRecipe(${index})">Upload</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

//delete recipes functionality
function deleteRecipe(index) {
    if (confirm("Delete this recipe?")) {
        deleteRecipeFromStorage(index);
        renderRecipes();
    }
}
// Uploads a recipe to server
async function uploadSingleRecipe(index) {
    const recipes = await getRecipes();
    const recipe = recipes[index];

    try {
        await fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        });

        alert("Recipe uploaded");
    } catch (error) {
        console.error("Upload failed:", error);
    }
}
renderRecipes();