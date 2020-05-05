import { getRecipes, removeRecipe, sortRecipes, getRecipeById, removeSingleIngredient } from './recipes'
import { getIngredients, sortIngredients, removeIngredient } from './ingredients'
import { getFilters } from './filters'
import moment from 'moment'

// Selecting DOM Elements for rendering
const recipesDiv = document.querySelector('.recipes')
const editIngredientsDiv = document.querySelector('.ingredients-area')
const ingredientsDiv = document.querySelector('.all-stuff')


// Generating a single recipe object to be visible in DOM
const generateRecipeDOM = ({ id, modifiedAt, name, ingredients:ingredientsRecipe }) => {

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

    buttonEdit.textContent = 'Edit'
    buttonDelete.textContent = 'Delete'

    // Adding event listeners to specific elements
    heading.addEventListener('click', () => { location.assign(`/recipe.html#${id}`) })
    buttonEdit.addEventListener('click', () => { location.assign(`/edit.html#${id}`) })
    buttonDelete.addEventListener('click', () => { 
        removeRecipe(id)
        renderRecipes()
    })

    // Now Setting all the data to these elements
    heading.textContent = name
    const ingredients = getIngredients()

    // This logic is implemented to show the number of available 
    // ingredients for the recipe in the ingredients inventory
    
    // To check the availability of ingredients
    let noOfAvailable = 0
    if(ingredientsRecipe.length > 0) {
        ingredients.forEach((item) => {
            ingredientsRecipe.includes(item.name) ? noOfAvailable++ : noOfAvailable
        })
    }
    

    // If all ingredients are present than return true, else false
    const isAll = noOfAvailable === ingredientsRecipe.length ? true : false   
    ingredientsInfo.innerHTML = `You have ${isAll === true ? 'all' : noOfAvailable} ingredient${noOfAvailable === 1 ? '' : 's'} for it.`

    // Shows time of modification
    info.innerHTML = `Modified ${moment(modifiedAt).fromNow()}`

    // Appending all the stuff in the right order
    divButton.appendChild(buttonEdit)
    divButton.appendChild(buttonDelete)

    divItem.appendChild(heading)
    divItem.appendChild(ingredientsInfo)
    divItem.appendChild(info)
    divItem.appendChild(divButton)

    recipesDiv.appendChild(divItem)

}

const generateIngredientDOM = (name, id, isEdit) => {
    // Creating all the required ingredients elements for a recipe object

    const divItem = document.createElement('div')
    const heading = document.createElement('p')
    const available = document.createElement('p')

    // Applying classes of Styling to these elements
    divItem.classList.add('stuff')    

    heading.textContent = name

    // Appending all the stuff in the right order

    divItem.appendChild(heading)
    // Doesn't generate the delete button if it isn't the edit page
    if (isEdit) {
        const divButton = document.createElement('div')
        const buttonDelete = document.createElement('button')
        buttonDelete.textContent = 'Remove'

        buttonDelete.classList.add('action', 'remove')

        buttonDelete.addEventListener('click', () => { 
            removeSingleIngredient(name, id)
            renderIngredients(id, isEdit)
        })
        divButton.appendChild(buttonDelete)
        divItem.appendChild(divButton)
    } else {
        // Setting available or not available
        const ingredients = getIngredients()
        const isAvailable = ingredients.find((item) => item.name === name)
        if (isAvailable) {
            available.textContent = 'Available'
            available.style.color = 'rgba(0, 255, 0, 0.7)'
        } else {
            available.textContent = 'Not Available'
            available.style.color = 'rgba(255, 0, 0, 0.7)'
        }

        divItem.appendChild(available)
    }

    ingredientsDiv.appendChild(divItem)

}

const generateEditItems = ({name, createdAt, id}) => {
    const outerDiv = document.createElement('div')
    const buttonDiv = document.createElement('div')
    const itemName = document.createElement('h3')
    const info = document.createElement('p')
    const removeButton = document.createElement('button')

    buttonDiv.classList.add('buttons')
    outerDiv.classList.add('item')
    removeButton.classList.add('action', 'remove')
    removeButton.textContent = 'Remove'
    removeButton.addEventListener('click', (e) => {
        removeIngredient(id)
        renderEditItems()
    })

    itemName.textContent = name
    info.textContent = `Created ${moment(createdAt).fromNow()}.`

    buttonDiv.appendChild(removeButton)
    outerDiv.appendChild(itemName)
    outerDiv.appendChild(info)
    outerDiv.appendChild(buttonDiv)

    editIngredientsDiv.appendChild(outerDiv)

}

// To render all the recipes on the index.html page
const renderRecipes = () => {
    const recipes = getRecipes()
    const filters = getFilters()
    recipesDiv.innerHTML = ''
    sortRecipes(filters.sortBy)

    const refinedResult = recipes.filter((recipe) => recipe.name.toLowerCase().includes(filters.searchText))
    if (refinedResult) {
        refinedResult.forEach((recipe) => {
            generateRecipeDOM(recipe)
        })
    } else {
        recipesDiv.innerHTML = `<h3>No Recipes to show</h3>`
    }
}

// To render ingredients of a recipe on the edit.html page
const renderIngredients = (recipeId, isEdit) => {
    ingredientsDiv.innerHTML = ''
    const recipes = getRecipes()
    const recipe = recipes.find((item) => recipeId === item.id)
    if (recipe.ingredients.length > 0) {
        recipe.ingredients.sort()
        recipe.ingredients.forEach((item) => {
            generateIngredientDOM(item, recipe.id, isEdit)
        })
    } else {
        ingredientsDiv.innerHTML = `<p>No ingredients to show.</p>`
    }

}

//To render ingredients on the add.html page
const renderEditItems = () => {
    const ingredients = getIngredients()
    editIngredientsDiv.innerHTML = ''
    const filters = getFilters()
    sortIngredients(filters.sortBy)
    const refinedResult = ingredients.filter((item) => item.name.toLowerCase().includes(filters.searchText))
    if(refinedResult.length > 0) {
        refinedResult.forEach((item) => {
            generateEditItems(item)
        })
    } else {
        editIngredientsDiv.innerHTML = `<h3>No ingredients in your inventory.</h3>`
    }
}

// Initializes the edit page with already present info of the recipe

const initializeEditPage = (recipeId, isEdit) => {
    const heading = document.querySelector('.heading h1')
    const inputName = document.querySelector('#recipe-name')
    const textArea = document.querySelector('#recipe-steps')

    const thisRecipe = getRecipeById(recipeId)

    heading.textContent = thisRecipe.name
    inputName.value = thisRecipe.name
    textArea.textContent = thisRecipe.text

    renderIngredients(recipeId, isEdit)
}

export { renderIngredients, renderRecipes, renderEditItems, initializeEditPage }