import { v4 as uuidv4 } from 'uuid'

let ingredients = []

const loadIngredients = () => {
    const ingredientsJSON = localStorage.getItem('ingredients')
    try {
        return ingredientsJSON !== null ? JSON.parse(ingredientsJSON) : []
    } catch (e) {
        return []
    }
}

const saveIngredients = () => {
    location.setItem('ingredients', JSON.stringify(ingredients))
}

const getIngredients = () => ingredients

const createIngredient = () => {
    const newIngredient = {
        id: uuidv4(),
        name: '',
        createdAt: moment().valueOf()
    }
    ingredients.push(newIngredient)
    saveIngredients()
    return newIngredient.id
}

const removeIngredient = (id) => {
    const index = ingredients.findIndex((item) => item.id === id)
    ingredients.splice(index, 1)
}

const sortIngredients = (sortBy) => {
    if (sortBy === 'byAdded') {
        ingredients.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return 1
            } else if (a.createdAt < b.createdAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byAlphabetical') {
        ingredients.sort((a, b) => {
            if (a.name > b.name) {
                return 1
            } else if (a.name < b.name) {
                return -1
            } else {
                return 0
            }
        })
    }
    saveIngredients()
}

ingredients = loadIngredients()

export { getIngredients, createIngredient, removeIngredient, sortIngredients }