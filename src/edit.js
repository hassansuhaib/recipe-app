import { updateRecipe } from './recipes'

const heading = document.querySelector('.heading')
const inputName = document.querySelector('#recipe-name')
const textArea = document.querySelector('#recipe-steps')

const reciepId = location.hash.substring(1)

