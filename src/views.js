import { getRecipes, removeRecipe, sortRecipes } from './recipes'
import { getIngredients, sortIngredients } from './ingredients'
import { getFilters } from './filters'
import { moment } from 'moment'

const recipes = getRecipes()
const ingredients = getIngredients()
const filters = getFilters()

// Selecting DOM Elements
const recipesDiv = document.querySelector('.recipes')
const ingredientsDiv = document.querySelector('.ingredients-area')
const editIngredientsDiv = document.querySelector('.all-stuff')



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
    heading.addEventListener('click', gotoLocation)
    buttonEdit.addEventListener('click', gotoLocation)
    buttonDelete.addEventListener('Click', removeRecipe(id))

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

const generateIngredientDOM = ({ name, modifiedAt }) => {
    // Creating all the required DOM elements for a recipe object

    const divItem = document.createElement('div')
    const heading = document.createElement('h3')
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
    heading.addEventListener('click', gotoLocation)
    buttonEdit.addEventListener('click', gotoLocation)
    buttonDelete.addEventListener('Click', removeRecipe(id))

    // Now Setting all the data to these elements
    heading.textContent = name

    // Shows time of modification
    info.innerHTML = `Added ${moment(createdAt).fromNow()}`

    // Appending all the stuff in the right order
    divButton.appendChild(buttonEdit)
    divButton.appendChild(buttonDelete)

    divItem.appendChild(heading)
    divItem.appendChild(info)
    divItem.appendChild(divButton)

    ingredientsDiv.appendChild(divItem)

}

const generateEditItems = (name) => {
    const outerDiv = document.createElement('div')
    const itemName = document.createElement('p')
    const removeButton = document.createElement('button')

    outerDiv.classList.add('stuff')
    removeButton.classList.add('action', 'remove')

    itemName.textContent = name

    outerDiv.appendChild(itemName)
    outerDiv.appendChild(removeButton)

    editIngredientsDiv.appendChild(outerDiv)


}

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

const renderIngredients = () => {

    sortIngredients(filters.sortBy)

    const refinedResult = ingredients.filter((item) => item.name.includes(filters.searchText))
    if (refinedResult) {
        refinedResult.forEach((ingredient) => {
            generateIngredientDOM(ingredient)
        })
    } else {
        ingredientsDiv.innerHTML = `<p>No Ingredients to Show </p>`
    }

}

//To render ingredients in the edit.html page
const renderEditItems = () => {
    
}

export { renderIngredients, renderRecipes }