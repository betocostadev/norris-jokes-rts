import axios from 'axios'
import { jokeCategoriesApiDataType, jokeSearchType, jokeByCategoryType } from '../utils/types'

const baseUrl =  'https://api.chucknorris.io/'

const getJokeCategories = async (): Promise<jokeCategoriesApiDataType> => {
  const response = await axios.get(`${baseUrl}jokes/categories/`)
  return response.data
}

const searchJoke = async (term: string): Promise<jokeSearchType> => {
  const response = await axios.get(`${baseUrl}jokes/search?query=${term}`)
  return response.data
}

const getJokeByCategory = async (term: string): Promise<jokeByCategoryType> => {
  const response = await axios.get(`${baseUrl}jokes/random?category=${term}`)
  return response.data
}


export default { getJokeCategories, searchJoke, getJokeByCategory }
