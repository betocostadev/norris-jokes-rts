import styled from 'styled-components';

export const HomeContainer = styled.div`
    width: 80%;
    margin: auto;
    .categories{
        display: flex;
    }
    .category{
      &:hover {
        cursor: pointer;
        color: white;
      }
    }
    .input-group{
    }
    .joker{
        display: block;
    }
`
