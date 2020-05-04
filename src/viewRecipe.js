import { getRecipeById } from './recipes'
import { renderIngredients } from './views'

const heading = document.querySelector('.heading h1')
const steps = document.querySelector('#steps')
const recipeId = location.hash.substring(1)

const thisRecipe = getRecipeById(recipeId)

heading.textContent = thisRecipe.name
steps.textContent = thisRecipe.textContent

// The second argument is set to false because this is not the edit.html page
renderIngredients(recipeId, false)




