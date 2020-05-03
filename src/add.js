import { renderIngredients } from './views'
import { updateFilters } from './filters'

renderIngredients()

// Selecting all the required elements from the DOM
const searchInput = document.querySelector('#search')
const selectInput = document.querySelector('#sort-by')

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

window.addEventListener('storage', (e) => {
    if(e.key === 'ingredients') {
        renderIngredients()
    }
})