import { renderRecipes } from './views'
import { updateFilters } from './filters'
import { createIngredient } from './ingredients'


renderRecipes()

// Selecting all the required elements from the DOM
const searchInput = document.querySelector('#search')
const selectInput = document.querySelector('#sort-by')
const addRecipeButton = document.querySelector('#add-recipe')
const addIngredientButton = document.querySelector('#add-ingredient')

// Adding event listeners to the DOM Elements
searchInput.addEventListener('input', (e) => {
    updateFilters({
        searchText: e.target.value
    })
    renderRecipes()
})
selectInput.addEventListener('change', (e) => {
    updateFilters({
        sortBy: e.target.value
    })
    renderRecipes()
})

addRecipeButton.addEventListener('click', () => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

addIngredientButton.addEventListener('click', () => {
    location.assign(`/add.html`)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'recipes') {
        renderRecipes()
    }
})

