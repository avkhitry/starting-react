import React, { useContext } from "react";
import PokemonRow from './PokemonRow';
import PokemonContext from "../PokemonContext";


const PokemonTable = () => {
const { state: {pokedata, filter}, dispatch } = useContext(PokemonContext);

    return (
        <table width="100%">
            <tbody>
                {pokedata
                    .filter(({ name: { english } }) =>
                        english
                            .toLocaleLowerCase()
                            .includes(filter.toLocaleLowerCase())
                    )
                    .slice(0, 20)
                    .map((poke) => (
                        <PokemonRow
                            pokemon={poke}
                            onClick={(poke) => dispatch({type: 'SET_SELECTED_POKEMON', payload: poke,})}
                        />
                    ))}
            </tbody>
        </table>
    )
}

export default PokemonTable;