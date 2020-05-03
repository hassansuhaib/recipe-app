import { renderRecipes } from './views'
import { updateFilters } from './filters'


renderRecipes()

// Selecting all the required elements from the DOM
const searchInput = document.querySelector('#search')
const selectInput = document.querySelector('#sort-by')
const addRecipeButton = document.querySelector('#add-recipe')

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

addRecipeButton.addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'recipes') {
        renderRecipes()
    }
})

