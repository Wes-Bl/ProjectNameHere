let addBtn = document.getElementById("add-btn");
let ingBtn = document.getElementById("add-ing");

let ingList = document.getElementById("ing-list");
let recipeList = document.getElementById("recipe-list");

let nameInput = document.getElementById("recipe-name");
let ingInput = document.getElementById("ingrs");
let instInput = document.getElementById("insts");

addBtn.addEventListener("click", craftRecipe);
ingBtn.addEventListener("click", addIngredient);

function addIngredient(){

    //Cancels if no ingredient
    if(ingInput.value.trim() == ""){
        ingInput.style.setProperty("border-color", "red");
        return;
    } else
        ingInput.style.setProperty("border-color", "gray");

    //Adds the item to the list
    ingList.innerHTML += "<li>" + ingInput.value + " " +
    "<button class=\"delete-btn\">&#10006;</button></li>";

    //Creates the delete button
    let delBtns = document.querySelectorAll(".delete-btn");
    delBtns.forEach(function(thisValue) {
        thisValue.addEventListener("click", function (event){
            ingList.removeChild(event.target.parentNode);
        });
    });

    //Clears the text box
    ingInput.value = "";
}

function craftRecipe(){

    //Cancels crafting and changes boxes to red when empty
    if(nameInput.value.trim() == ""){
        nameInput.style.setProperty("border-color", "red");
        return;
    } else 
        nameInput.style.setProperty("border-color", "gray");

    if(instInput.value.trim() == ""){
        instInput.style.setProperty("border-color", "red");
        return;
    } else
        instInput.style.setProperty("border-color", "gray");

    //Removes the delete button from ingredients
    //Current not working for apparently no reason
    let ingredients = ingList.innerHTML.replaceAll("<button class=\"delete-btn\">&#10006;</button>", "")
    
    //Adds the item to the list
    recipeList.innerHTML += "<li class=\"recipeCont\">New Recipe: " +
        nameInput.value + " <ul>" + ingredients + "</ul> " + instInput.value +
        " " + "<button class=\"delete-btn\">&#10006;</button></li>";

    //Creates the delete button
    let delBtns = document.querySelectorAll(".delete-btn");
    delBtns.forEach(function(thisValue) {
        thisValue.addEventListener("click", function (event){
            recipeList.removeChild(event.target.parentNode);
        });
    });

    //Clears the inputs
    nameInput.value = ingredients;
    ingList.innerHTML = "";
    instInput.value = "";
}