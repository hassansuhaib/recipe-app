import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

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
    localStorage.setItem('ingredients', JSON.stringify(ingredients))
}

const getIngredients = () => ingredients

const createIngredient = (name) => {
    const newIngredient = {
        id: uuidv4(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        createdAt: moment().valueOf()
    }
    ingredients.push(newIngredient)
    saveIngredients()
}

const removeIngredient = (id) => {
    const index = ingredients.findIndex((item) => item.id === id)
    ingredients.splice(index, 1)
}

const sortIngredients = (sortBy) => {
    if (sortBy === 'byCreated') {
        ingredients.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byAlpha') {
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