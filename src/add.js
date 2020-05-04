import { renderIngredients, renderEditItems } from './views'
import { updateFilters } from './filters'
import { createIngredient } from './ingredients'

renderIngredients()

// Selecting all the required elements from the DOM
const searchInput = document.querySelector('#search')
const selectInput = document.querySelector('#sort-by')
const addNewIngredient = document.querySelector('#add-new-ingredient')
const addNewButton = document.querySelector('#add-new-to-inventory')
const ingredientName

searchInput.addEventListener('input', (e) => {
    updateFilters({
        searchText: e.target.value
    })
    renderIngredients()
})
selectInput.addEventListener('change', (e) => {
    updateFilters({
        sortBy: e.target.value
    })
    renderIngredients()
})

addNewIngredient.addEventListener('input', (e) => {
    ingredientName = e.target.value
})

addNewButton.addEventListener('click', () => {
    createIngredient(ingredientName)
    renderEditItems()
})

window.addEventListener('storage', (e) => {
    if(e.key === 'ingredients') {
        renderEditItems()
    }
})