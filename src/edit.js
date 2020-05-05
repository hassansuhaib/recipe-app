import { updateRecipe, getRecipeById, removeRecipe } from './recipes'
import { initializeEditPage, renderIngredients } from './views'

// Selecting all the required DOM Elements
const heading = document.querySelector('.heading h1')
const inputName = document.querySelector('#recipe-name')
const textArea = document.querySelector('#recipe-steps')
const newIngredient = document.querySelector('#new-ingredient')
const saveButton = document.querySelector('#save-recipe')
const deleteButton = document.querySelector('#delete-recipe')
const addIngredientButton = document.querySelector('#add-ingredient-edit')

let newIngredientValue = ''

const recipeId = location.hash.substring(1)
const thisRecipe = getRecipeById(recipeId)

// To load the page with previous info of recipe if any
initializeEditPage(recipeId, true)

// Adding event listeners to the specific DOM elements
inputName.addEventListener('input', (e) => {
    thisRecipe.name = e.target.value
    heading.textContent = e.target.value
})

textArea.addEventListener('input', (e) => {
    thisRecipe.text = e.target.value
})

newIngredient.addEventListener('input', (e) => {
    newIngredientValue = e.target.value
})


newIngredient.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        addIngredientButton.click()
    }
})

saveButton.addEventListener('click', (e) => {
    updateRecipe(thisRecipe)
    location.assign('/index.html')
})

deleteButton.addEventListener('click', (e) => {
    removeRecipe(thisRecipe.id)
    location.assign('/index.html')
}) 

addIngredientButton.addEventListener('click', (e) => {
    thisRecipe.ingredients.push(newIngredientValue)
    updateRecipe(thisRecipe)
    newIngredient.value = ''
    renderIngredients(thisRecipe.id, true)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId, true)
    }
})


