import { DisneyCharacter } from "../disney_character";
import { useContext} from 'react';
import { FavouritesContext} from '../App';

// character.tsx
interface CharacterProps{
	character: DisneyCharacter;
	updateFavourites: (favourites: Array<number>) => void;
}

// for our props we can reuse the DisneyCharacter interface
// - defining an anonymous type that just has one property - a DisneyCharacter
const Character : React.FC<CharacterProps> = ( { character, updateFavourites }) =>  {
  
  // Define a default in case the character doesn't have an image
  let imageSrc = "https://picsum.photos/300/200/?blur";
  if (character.imageUrl) {
    // API seems to include extra path for images so here we strip it off to fetch raw image
    imageSrc = character.imageUrl.substring(0, character.imageUrl.length || character.imageUrl.indexOf('/revision'));
  }


const characterFavourites = useContext(FavouritesContext);

  function toggleFavouriteForCharacter(characterId : number) {
    if(!(characterId)) {
        // add to favourites
        updateFavourites([...characterFavourites, characterId]);
    }
    else {
      // remove from favourites
      const updatedFavourites = characterFavourites.filter((id) => id !== characterId);
      updateFavourites(updatedFavourites);
    }
  }
  
  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={() => toggleFavouriteForCharacter(character._id)}>
        Add to Favourites
      </div>
      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
) }

export default Character