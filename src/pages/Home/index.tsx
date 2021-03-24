import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import ChuckGif from '../../img/giphy.gif';
import { HomeContainer } from './style';

interface IJoke{
  id: string;
  icon_url: string;
  value: string;
}

const Home: React.FC = () => {
    const [ categoriesJoke, setCategoriesJoke ] = useState([]);
    const [ categorySelected, setCategorySelected ] = useState<IJoke>()
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
        const response = await api.get('jokes/categories')
        setCategoriesJoke(response.data)
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
        const response = await api.get(`jokes/search?query=${searchJoke}`)
        setResultSearch(response.data.result)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    async function handleJokeByCategory(e: string){
      try {
        setIsLoading(true)

        const response = await api.get(`jokes/random?category=${e}`)
        setCategorySelected(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    return (
        <HomeContainer>
            <div className="categories">
                <ul>
                  {
                    categoriesJoke.map((joke, index) => (
                      <li className="category" key={index} onClick={ () => handleJokeByCategory(joke) }>{joke}</li>
                    ))
                  }
                </ul>
            </div>

            <div>
              <img src={categorySelected?.icon_url} alt={categorySelected?.value}/>
              <h3>{categorySelected?.value}</h3>
            </div>

            <h2>Find Joke</h2>

            <div className="input-group">
              <input type="text" onChange={ e => setSearchJoke(e.target.value)} />
              <button type="submit" onClick={handleJokes}> Find joke</button>
            </div>

            <p>Find results for:</p>

            <div className="joker">
              {
                isLoading ? <img src={ChuckGif} alt="load"/> : resultSearch.map( result => (
                  <div key={result.id}>
                      <img src={result.icon_url} alt={result.value}/>
                      <h3>{result.value}</h3>
                  </div>
                ))
              }
            </div>

        </HomeContainer>
    );
}

export default Home;


// { isLoad ? <img src={LoadGif} alt="load"/> : resultSearch.map( result => (
//   <div key={result.id}>
//       <img src={result.icon_url} alt={result.value}/>
//       <h3>{result.value}</h3>
//   </div>
// )) }
