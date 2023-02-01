
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';
import { json } from 'stream/consumers';

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
      const responseFetch = await fetch(`https://api.disneyapi.dev/characters?pages={pageNumber}`);
      if (responseFetch.ok) {
        const jsonFetch = await responseFetch.json() as {data:DisneyCharacter[]};
        setCharacters(jsonFetch.data);  
      }
    }
    catch (err) {
      console.log("error");
    }
  }



  return (
    <div className="page">
      <Header currentPage={currentPage} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters}
                          characterFavourites={characterFavourites}
                          updateFavourites={setCharacterFavourites}  />
    </div>
  );
}

export default App;
