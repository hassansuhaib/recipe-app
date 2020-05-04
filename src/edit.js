import { updateRecipe, getRecipeById, removeRecipe } from './recipes'
import { initializeEditPage, renderIngredients } from './views'

// Selecting all the required DOM Elements
const heading = document.querySelector('.heading')
const inputName = document.querySelector('#recipe-name')
const textArea = document.querySelector('#recipe-steps')
const newIngredient = document.querySelector('#new-ingredient')
const saveButton = document.querySelectorAll('.action.edit')
const deleteButton = document.querySelectorAll('.action.delete')
const addIngredientButton = document.querySelector('.action')

const recipeId = location.hash.substring(1)
const thisRecipe = getRecipeById(recipeId)

const currentAddress = window.location.origin;
const isEdit = currentAddress.match(/edit/g) === 'edit' ? true : false

// To load the page with previous info of recipe if any
initializeEditPage(recipeId, isEdit)

// Adding event listeners to the specific DOM elements
inputName.addEventListener('input', (e) => {
    thisRecipe.name = e.target.value
    heading.textContent = e.target.value
})
textArea.addEventListener('input', (e) => {
    thisRecipe.text = e.target.value
})

saveButton.addEventListener('click', () => {
    updateRecipe(thisRecipe)
    location.assign('/index.html')
})

deleteButton.addEventListener('click', () => {
    removeRecipe(thisRecipe.id)
    location.assign('/index.html')
})

addIngredientButton.addEventListener('click', () => {
    thisRecipe.ingredients.push(newIngredient.textContent)
    renderIngredients(thisRecipe.id, isEdit)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId, isEdit)
    }
})

