
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';
import { json } from 'stream/consumers';
export const FavouritesContext = React.createContext<number[]>( []);

const App : React.FC = () => {

	const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getCharacters(currentPage);
  },[currentPage]);

  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([
    ]);
  const [characterFavourites,setCharacterFavourites] = useState<Array<number>>([]);
  const getCharacters = async (pageNumber: number) => {
    try {
      console.log(pageNumber);
      const responseFetch = await fetch(`https://api.disneyapi.dev/characters?page=${pageNumber}`);
      if (responseFetch.ok) {
        const jsonFetch = await responseFetch.json() as {data:DisneyCharacter[]};
        setCharacters(jsonFetch.data);  
        console.trace(`value set ${jsonFetch.data[1].name}`);
      }
    }
    catch (err) {
      console.log("error");
    }
  }



  return (
    <FavouritesContext.Provider value={characterFavourites}>
    <div className="page">
      <Header currentPage={currentPage} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters}
                          updateFavourites={setCharacterFavourites}  />
    </div>
    </FavouritesContext.Provider>

  );
}


export default App;
