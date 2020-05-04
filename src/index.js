import { renderRecipes } from './views'
import { updateFilters } from './filters'
import { createRecipe } from './recipes'


renderRecipes()

// Selecting all the required elements from the DOM
const searchInput = document.querySelector('#search')
const selectInput = document.querySelector('#sort-by')
const addRecipeButton = document.querySelector('#add-recipe')
const addIngredientButtonIndex = document.querySelector('#add-ingredient-index')

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

addIngredientButtonIndex.addEventListener('click', () => {
    location.assign(`/add.html`)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'recipes') {
        renderRecipes()
    }
})

