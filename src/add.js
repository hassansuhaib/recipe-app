import { renderEditItems } from './views'
import { updateFilters } from './filters'
import { createIngredient } from './ingredients'

renderEditItems()

// Selecting all the required elements from the DOM
const searchInput = document.querySelector('#search')
const selectInput = document.querySelector('#sort-by')
const addNewIngredient = document.querySelector('#add-new-ingredient')
const addNewButton = document.querySelector('#add-new-to-inventory')
let ingredientName = ''

searchInput.addEventListener('input', (e) => {
    updateFilters({
        searchText: e.target.value
    })
    renderEditItems()
})

selectInput.addEventListener('change', (e) => {
    updateFilters({
        sortBy: e.target.value
    })
    renderEditItems()
})

addNewIngredient.addEventListener('input', (e) => {
    ingredientName = e.target.value
})

addNewIngredient.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        addNewButton.click()
    }
})

addNewButton.addEventListener('click', () => {
    createIngredient(ingredientName)
    addNewIngredient.value = ''
    renderEditItems()
})



window.addEventListener('storage', (e) => {
    if(e.key === 'ingredients') {
        renderEditItems()
    }
})