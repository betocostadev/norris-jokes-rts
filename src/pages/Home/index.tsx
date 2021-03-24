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
    const [ categorySelected, setCategorySelected ] = useState<jokeByCategoryType | null>()
    const [ searchJoke, setSearchJoke ] = useState<string>('')
    const [ searchField, setSearchField ] = useState<string>('')
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ resultSearch, setResultSearch ] = useState<IJoke[]>([])
    const [ activeButton, setActiveButton ] = useState<string>('')

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchField(e.target.value)
      setSearchJoke(e.target.value)
    }

    const handleJokes = async () => {
      try {
        setIsLoading(true)
        const response = await api.searchJoke(searchJoke)
        setResultSearch(response.result)
        setCategorySelected(null)
        setActiveButton('')
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    const handleJokeByCategory = async (term: string) => {
      try {
        setIsLoading(true)
        setSearchJoke('')
        setSearchField('')
        setActiveButton(term)

        const response = await api.getJokeByCategory(term)
        setCategorySelected(response)
      } catch (error) {
        console.log(error)
      } finally {
        setResultSearch([emptySearchResults])
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
              <input type="text" onChange={handleSearch} value={searchField}/>
              <button type="submit" onClick={handleJokes} disabled={searchField?.length ? false : true}> Find joke</button>
            </div>
          </div>

            <div className="categories">
                <ul>
                  {
                    categoriesJoke.map((joke: string, index: number) => (
                      <li
                        className={activeButton === joke ? "active category" : "category"}
                        key={index}
                        onClick={() => handleJokeByCategory(joke) }>{joke}</li>
                    ))
                  }
                </ul>
            </div>

            <div className={ categorySelected ? "joke-card" : "" }>
              <img src={categorySelected?.icon_url} alt={categorySelected?.value}/>
              <h3>{categorySelected?.value}</h3>
            </div>

            { resultSearch && resultSearch[0] && resultSearch[0].id
              ? <h3>Results found for: {searchJoke}</h3>
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
