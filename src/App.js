import React from "react";
import styled from "@emotion/styled";
import CssBaseline from '@mui/material/CssBaseline';


import './App.css';

import PokemonInfo from './components/PokemonInfo';
import PokemonFilter from './components/PokemonFilter';
import PokemonTable from './components/PokemonTable';
import PokemonContext from "./PokemonContext";


const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_POKEMON':
      return {
        ...state,
        pokedata: action.payload,
      };
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    default:
      throw new Error("No action");
  }

}


const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;


function App() {
  // const [pokedata, pokemonSet] = React.useState(null);
  // const [filter, filterSet] = React.useState("");
  // const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  const [state, dispatch] = React.useReducer(pokemonReducer, {
    pokedata: [],
    filter: "",
    selectedPokemon: null,
  })

  React.useEffect(() => {
    fetch("/starting-react/pokemon.json")
      .then((resp) => resp.json())
      .then((pokedata) => dispatch({
        type: "SET_POKEMON",
        payload: pokedata
      }));
  }, []);

  if (!state.pokedata) {
    return <div>Loading data</div>;
  }

  return (
    <PokemonContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <PageContainer>
        <CssBaseline />
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </PageContainer>
    </PokemonContext.Provider>
  );
}

export default App;