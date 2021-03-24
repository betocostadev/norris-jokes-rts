import React, { useEffect, useState } from 'react'

import api from '../../services/api'
import { jokeByCategoryType, IJoke } from '../../utils/types'
import ChuckGif from '../../img/giphy.gif'
import { HomeContainer } from './style'

const emptySearchResults = {
  id: '',
  icon_url: '',
  value: ''
}

const Home: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ categoriesJoke, setCategoriesJoke ] = useState([] as any)
    const [ categorySelected, setCategorySelected ] = useState<jokeByCategoryType>()
    const [ searchJoke, setSearchJoke ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ resultSearch, setResultSearch ] = useState<IJoke[]>([])

    // useEffect( () => {
    //     api.get('jokes/categories').then(
    //         response => {
    //             setCategoriesJoke(response.data)
    //         }
    //     )
    // }, [])

    const getCategories = async () => {
      try {
        setIsLoading(true)
        const response = await api.getJokeCategories()
        setCategoriesJoke(response)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    const hook = () => {
      getCategories()
    }

    useEffect(hook, [])

    async function handleJokes(){
      try {
        setIsLoading(true)
        const response = await api.searchJoke(searchJoke)
        setResultSearch(response.result)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    async function handleJokeByCategory(term: string){
      try {
        setIsLoading(true)

        const response = await api.getJokeByCategory(term)
        setCategorySelected(response)
      } catch (error) {
        console.log(error)
      } finally {
        setResultSearch([emptySearchResults])
        setSearchJoke('')
        setIsLoading(false)
      }
    }

    return (
        <HomeContainer>
          <div className="home-content">
          <h1 style={{textAlign: 'center'}}>Norris Jokes</h1>
          <div className="search-box">
            <h2>Find Joke</h2>
            <div className="input-group">
              <input type="text" onChange={e => setSearchJoke(e.target.value)} />
              <button type="submit" onClick={handleJokes}> Find joke</button>
            </div>
          </div>

            <div className="categories">
                <ul>
                  {
                    categoriesJoke.map((joke: string, index: number) => (
                      <li className="category" key={index} onClick={ () => handleJokeByCategory(joke) }>{joke}</li>
                    ))
                  }
                </ul>
            </div>

            <div className={ categorySelected ? "joke-card" : "" }>
              <img src={categorySelected?.icon_url} alt={categorySelected?.value}/>
              <h3>{categorySelected?.value}</h3>
            </div>

            { searchJoke && searchJoke
              ? <p>Results found for: {searchJoke}</p>
              : ''
            }

            <div className={ isLoading ? "search-gif" : "joker"}>
              {
                isLoading
                ? <img className="search-gif" src={ChuckGif} alt="load"/>
                : resultSearch.map( result => (
                  <div className={ result && result.value ? "joke-card" : "" } key={result.id}>
                      <img src={result.icon_url} alt={result.value}/>
                      <h3>{result.value}</h3>
                  </div>
                ))
              }
            </div>
          </div>
        </HomeContainer>
    )
}

export default Home
