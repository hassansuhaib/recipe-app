import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

let recipes = []

// Gets the recipes from Local Storage and loads them
const loadRecipes = () => {
    const localRecipes = localStorage.getItem('recipes')
    try {
        return localRecipes !== null ? JSON.parse(localRecipes) : []
    } catch(e) {
        return []
    }
}

// Saves the recipes on to the Local Storage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Return the Recipes array
const getRecipes = () => recipes

// Removes a Recipe with a certain ID and saves the resulting array to the Local Storage
const removeRecipe = (id) => {
    const index = recipes.findIndex((item) => item.id === id)
    recipes.splice(index, 1)
    saveRecipes()
}

// Creates a new Recipe object, pushes it into the Recipes array and then saves the array to the Local Storage
const createRecipe = () => {
    const now = moment().valueOf()
    const recipe = {
        id: uuidv4(),
        createdAt: now,
        modifiedAt: now,
        name: 'My New Recipe',
        ingredients: [],
        text: 'Steps'
    }
    recipes.push(recipe)
    saveRecipes()
    return recipe.id
}

const updateRecipe = (newRecipe) => {
    const index = recipes.findIndex((item) => item.id === newRecipe.id)
    recipes.splice(index, 1, {...newRecipe})
    saveRecipes() 
}

// To sort the recipes by different criteria 
const sortRecipes = (sortBy) => {
    if (sortBy === 'byEdited') {
        recipes.sort((a, b) => {
            if (a.modifiedAt > b.modifiedAt) {
                return 1
            } else if (a.modifiedAt < b.modifiedAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        recipes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return 1
            } else if (a.createdAt < b.createdAt) {
                return -1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byAlphabetical') {
        recipes.sort((a,b) => {
            if (a.name > b.name) {
                return 1
            } else if(a.name < b.name) {
                return -1
            } else {
                return 0
            }
        })
    }
    saveRecipes()
}

const getRecipeById = (recipeId) => {
    return recipes.find((recipe) => recipe.id === recipeId)
}

const removeSingleIngredient = (name, recipeId) => {
    const thisRecipe = getRecipeById(recipeId)
    const indexIngredient = thisRecipe.ingredients.findIndex((item) => item === name)
    thisRecipe.ingredients.splice(indexIngredient, 1)
    updateRecipe(thisRecipe)
}

// For initially loading all the recipe objects on to the Recipe array
recipes = loadRecipes()

export { saveRecipes, getRecipes, removeRecipe, createRecipe, sortRecipes, updateRecipe, getRecipeById, removeSingleIngredient }