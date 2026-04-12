let addBtn = document.getElementById("add-btn");
let ingBtn = document.getElementById("add-ing");

let ingList = document.getElementById("ing-list");

let nameInput = document.getElementById("recipe-name");
let ingInput = document.getElementById("ingrs");
let instInput = document.getElementById("insts");



let currentIngredients =[];

ingBtn.addEventListener("click", addIngredient);
ingInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addIngredient();
    }
});
addBtn.addEventListener("click", addRecipe);
instInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addRecipe();
    }
});
//stores ingredients in array and cleares input after clicking "add ingredient"
function addIngredient() {
    if (ingInput.value.trim() === "") {
        ingInput.style.borderColor = "red";
        return;
    }

    ingInput.style.borderColor = "gray";

    currentIngredients.push(ingInput.value.trim());
    console.log(currentIngredients);

    renderIngredients();

    ingInput.value = "";
}


// dislays array info on page
function renderIngredients() {
    // Reset display: clear existing list to avoid duplicates
    ingList.innerHTML = "";

    // Loop through all current ingredients
    for (let i = 0; i < currentIngredients.length; i++) {

        // Create list item and assign ingredient text
        let li = document.createElement("li");
        li.textContent = currentIngredients[i];

        // Create delete button and attach behavior
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");

        // When clicked, remove this ingredient from the array
        deleteBtn.addEventListener("click", function() {
            deleteIngredient(i);
        });

        // Assemble element: attach button to list item
        li.appendChild(deleteBtn);

        // Render element: add completed list item to the page
        ingList.appendChild(li);
    }
}
//allows you to delete ingredients from in-progress recipe
function deleteIngredient(index) {
    currentIngredients.splice(index, 1);
    renderIngredients();
}

// recipe saving function
function addRecipe() {
    //prevents recipes being added without a name, then highlights box red if it is empty
    if (nameInput.value.trim() === "") {
        nameInput.style.borderColor = "red";
        return;
    }
    //same thing but for instruction box
    nameInput.style.borderColor = "gray";

    if (instInput.value.trim() === "") {
        instInput.style.borderColor = "gray";
        return;
    }
    // makes sure there are ingredients before recipe is saved, similiar color changes
    instInput.style.borderColor = "gray";

    if (currentIngredients.length === 0) {
        ingInput.style.borderColor = "gray";
        return;
    }
    //
    let recipe = {
        name: nameInput.value.trim(),
        ingredients: [...currentIngredients],
        instructions: instInput.value.trim()
    };

    recipes.push(recipe);
    saveRecipes();

    window.location.href = "MyRecipes.html";
    console.log(recipes);

    currentIngredients = [];
    renderIngredients();

    nameInput.value = "";
    instInput.value = "";
    ingInput.style.borderColor = "gray";
    //shows new recipes
   
}







