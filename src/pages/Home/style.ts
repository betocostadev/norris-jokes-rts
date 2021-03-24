import styled from 'styled-components'

export const HomeContainer = styled.div`
  width: 80%;
  margin: auto;
  .search-box {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    h2 {
      margin: 0.75rem;
    }
  }
  .categories {
    margin: 1rem;
    display: flex;
    justify-content: center;
    ul {
      width: 70%;
      list-style: none;
      flex-wrap: wrap;
      display: flex;
    }
  }
  .category {
    margin: 0.5rem;
    padding: 0.3rem;
    padding-top: 0.5rem;
    vertical-align: bottom;
    min-width: 6rem;
    height: 2rem;
    background: whitesmoke;
    color: #777;
    border-radius: 0.2rem;
    box-shadow: 2px 4px 5px 1px rgba(0,0,0,0.75);
    &:hover {
      cursor: pointer;
      color: #222;
      box-shadow: 1px 3px 3px 0px rgba(0,0,0,0.75);
    }
  }
  .input-group {
  }
  .joke-card {
    background: whitesmoke;
    display: flex;
    margin: 1rem 0;
    padding: 0.5rem;
    align-items: center;
    box-shadow: 1px 2px 2px rgba(0,0,0,0.75);
    border-radius: 0.2rem;
    img {
      padding-right: 1rem;
    }
  }
  .joker {
    display: block;
  }
  .search-gif {
    margin: 1rem auto;
    text-align: center;
  }
`
