import { getRecipes, removeRecipe, sortRecipes, getRecipeById } from './recipes'
import { getIngredients, sortIngredients, removeIngredient } from './ingredients'
import { getFilters } from './filters'
import { moment } from 'moment'

// getting data from respective files to use here
const recipes = getRecipes()
const ingredients = getIngredients()
const filters = getFilters()

// Selecting DOM Elements for rendering
const recipesDiv = document.querySelector('.recipes')
const editTngredientsDiv = document.querySelector('.ingredients-area')
const ingredientsDiv = document.querySelector('.all-stuff')


// Generating a single recipe object to be visible in DOM
const generateRecipeDOM = ({ id, modifiedAt, name, ingredientsRecipe }) => {

    // Creating all the required DOM elements for a recipe object
    const divItem = document.createElement('div')
    const heading = document.createElement('h2')
    const ingredientsInfo = document.createElement('p')
    const info = document.createElement('p')
    const divButton = document.createElement('div')
    const buttonEdit = document.createElement('button')
    const buttonDelete = document.createElement('button')

    // Applying classes of Styling to these elements
    divItem.classList.add('item')
    divButton.classList.add('buttons')
    buttonEdit.classList.add('action', 'edit')
    buttonDelete.classList.add('action', 'delete')

    // Adding event listeners to specific elements
    heading.addEventListener('click', location.assign(`/recipe.html#${id}`))
    buttonEdit.addEventListener('click', location.assign(`/edit.html#${id}`))
    buttonDelete.addEventListener('Click', () => { 
        removeRecipe(id)
        renderRecipes()
    })

    // Now Setting all the data to these elements
    heading.textContent = name

    // To check the availability of ingredients
    const noOfAvailable = ingredientsRecipe.reduce((sum = 0, currentItem) => {
        return ingredients.includes(currentItem) ? sum++ : sum
    })

    // If all ingredients are present than return true, else false
    const isAll = noOfAvailable === ingredientsRecipe.length ? true : false
    ingredientsInfo.innerHTML = `You have ${isAll === true ? 'all' : noOfAvailable} ingredients for it.`

    // Shows time of modification
    info.innerHTML = `Modified ${moment(modifiedAt).fromNow()}`

    // Appending all the stuff in the right order
    divButton.appendChild(buttonEdit)
    divButton.appendChild(buttonDelete)

    divItem.appendChild(heading)
    divItem.appendChild(ingredients)
    divItem.appendChild(info)
    divItem.appendChild(divButton)

    recipesDiv.appendChild(divItem)

}

const generateIngredientDOM = (name, isEdit) => {
    // Creating all the required ingredients elements for a recipe object

    const divItem = document.createElement('div')
    const heading = document.createElement('h3')

    // Applying classes of Styling to these elements
    divItem.classList.add('item')    
    
    // Now Setting all the data to these elements
    heading.textContent = name

    // Appending all the stuff in the right order

    divItem.appendChild(heading)
    // Doesn't generate the delete button if it isn't the edit page
    if (isEdit) {
        const divButton = document.createElement('div')
        const buttonDelete = document.createElement('button')

        divButton.classList.add('buttons')
        buttonDelete.classList.add('action', 'delete')

        buttonDelete.addEventListener('Click', removeRecipe(id))
        divButton.appendChild(buttonDelete)
        divItem.appendChild(divButton)
    }

    ingredientsDiv.appendChild(divItem)

}

const generateEditItems = ({name, createdAt, id}) => {
    const outerDiv = document.createElement('div')
    const itemName = document.createElement('h3')
    const info = document.querySelector('p')
    const removeButton = document.createElement('button')

    outerDiv.classList.add('stuff')
    removeButton.classList.add('action', 'remove')
    removeButton.addEventListener('click', removeIngredient(id))

    itemName.textContent = name
    info.textContent = `Created ${moment().from(createdAt)}.`

    outerDiv.appendChild(itemName)
    outerDiv.appendChild(info)
    outerDiv.appendChild(removeButton)

    editIngredientsDiv.appendChild(outerDiv)

}

// To render all the recipes on the index.html page
const renderRecipes = () => {
    sortRecipes(filters.sortBy)

    const refinedResult = recipes.filter((recipe) => recipe.name.includes(filters.searchText))
    if (refinedResult) {
        refinedResult.forEach((recipe) => {
            generateRecipeDOM(recipe)
        })
    } else {
        recipesDiv.innerHTML = `<h3>No Recipes to show</h3>`
    }
}

// To render ingredients of a reciep on the edit.html page
const renderIngredients = (recipeId, isEdit) => {
    const recipe = recipes.find((item) => recipeId === item.id)
    if (recipe) {
        ingredients.sort()
        recipe.ingredients.forEach((item) => {
            generateIngredientDOM(item, isEdit)
        })
    } else {
        ingredientsDiv.innerHTML = `<p>No ingredients to show.</p>`
    }

}

//To render ingredients on the add.html page
const renderEditItems = () => {
    sortIngredients(filters.sortBy)
    if(ingredients) {
        ingredients.forEach((item) => {
            generateEditItems(item)
        })
    } else {
        editTngredientsDiv.innerHTML = `<h3>No ingredients in your inventory.</h3>`
    }
}

// Initializes the edit page with already present info of the recipe

const initializeEditPage = (recipeId, isEdit) => {
    const heading = document.querySelector('.heading')
    const inputName = document.querySelector('#recipe-name')
    const textArea = document.querySelector('#recipe-steps')

    const thisRecipe = getRecipeById(recipeId)

    heading.textContent = thisRecipe.name
    inputName.textContent = thisRecipe.name
    textArea.textContent = thisRecipe.text

    renderIngredients(recipeId, isEdit)
}

export { renderIngredients, renderRecipes, renderEditItems, initializeEditPage }