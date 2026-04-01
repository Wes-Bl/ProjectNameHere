let addBtn = document.getElementById("add-btn");
let ingBtn = document.getElementById("add-ing");

let ingList = document.getElementById("ing-list");
let recipeList = document.getElementById("recipe-list");

let nameInput = document.getElementById("recipe-name");
let ingInput = document.getElementById("ingrs");
let instInput = document.getElementById("insts");

let recipes =[];
//saves recipes as json
function saveRecipes() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function loadRecipes() {
    let stored = localStorage.getItem("recipes");

    if (stored) {
        recipes = JSON.parse(stored);
    } else {
        recipes = [];
    }
}

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
    //clears old ingredients from ul to prevent dupes
    ingList.innerHTML = "";
    //creates list in memory then displays
    for (let i = 0; i < currentIngredients.length; i++) {
        let li = document.createElement("li");
        li.textContent = currentIngredients[i];
        ingList.appendChild(li);
        //adds delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            deleteIngredient(i);
        });

        li.appendChild(deleteBtn);
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
        instInput.style.borderColor = "red";
        return;
    }
    // makes sure there are ingredients before recipe is saved, similiar color changes
    instInput.style.borderColor = "gray";

    if (currentIngredients.length === 0) {
        ingInput.style.borderColor = "red";
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
    console.log(recipes);

    currentIngredients = [];
    renderIngredients();

    nameInput.value = "";
    instInput.value = "";
    ingInput.style.borderColor = "gray";
    //shows new recipes
    renderRecipes();
}

function renderRecipes() {
    recipeList.innerHTML = "";
    //assigns each recipe to variable 
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        //creates container for recipe and applies css
        let li = document.createElement("li");
        li.classList.add("recipeCont");
        //puts title as header
        let title = document.createElement("h3");
        title.textContent = recipe.name;
        //add paragraph with instructions
        let ingUl = document.createElement("ul");
        for (let j = 0; j < recipe.ingredients.length; j++) {
            let ingLi = document.createElement("li");
            ingLi.textContent = recipe.ingredients[j];
            ingUl.appendChild(ingLi);
        }

        let instructions = document.createElement("p");
        instructions.textContent = recipe.instructions;
        //adds delete button
                let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            deleteRecipe(i);
        });
        //puts everything in recipe container
        li.appendChild(title);
        li.appendChild(ingUl);
        li.appendChild(instructions);
        li.appendChild(deleteBtn);
        //adds to list
        recipeList.appendChild(li);
    }
}

//delete recipes functionality
function deleteRecipe(index) {
    recipes.splice(index, 1);
    saveRecipes();
    renderRecipes();
}

//shows recipes in storage on launch
loadRecipes();
renderRecipes();
