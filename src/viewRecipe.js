import { getRecipeById, removeRecipe } from './recipes'
import { renderIngredients, renderRecipes } from './views'

const heading = document.querySelector('.heading h1')
const steps = document.querySelector('#recipe-steps')
const deleteButton = document.querySelector('#delete-recipe')
const editButton = document.querySelector('#edit-recipe')
const homeButton = document.querySelector('#home')

const recipeId = location.hash.substring(1)

const thisRecipe = getRecipeById(recipeId)

heading.textContent = thisRecipe.name
steps.textContent = thisRecipe.text

// The second argument is set to false because this is not the edit.html page
renderIngredients(recipeId, false)

deleteButton.addEventListener('click', () => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

editButton.addEventListener('click', () => {
    location.assign(`/edit.html#${recipeId}`)
})

homeButton.addEventListener('click', () => {
    location.assign('/index.html')
})




