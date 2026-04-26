


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
            
            for(let i = 0; i < recipe.ingredients.length; i++){
                row.innerHTML = row.innerHTML.substring(0, row.innerHTML.indexOf("</ul>"))
                 + `<li>${recipe.ingredients[i]}</li>` + "</ul></td>";
            }
    
        row.innerHTML += `
            <td class=\"recipeCont\" width=\"400\">${recipe.instructions}</td>
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
        deleteRecipeFromStorage(index);
        renderRecipes();
    }
}

renderRecipes();