import { FavouritesContext } from "../App";

// our props have two properties - a number, and a function that takes a number and returns void
// we can define this as an interface, or anonymously like this:
const Navigation: React.FC<{
  currentPage: number;
  setCurrentPage: (page: number) => void;
}> = ({ currentPage, setCurrentPage }) => {
  const nextPage = () => {
    const newPageNumber = currentPage + 1;
    setCurrentPage(newPageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPageNumber = currentPage - 1;
      setCurrentPage(newPageNumber);
    }
  };

  const showFavourites = () => {
    setCurrentPage(currentPage);
  };

  return (
    <div className="navigation">
      <div className="navigation__item">
        <button className="navigation__button" onClick={prevPage}>
          Prev Page
        </button>
      </div>
      <div className="navigation__item">
        <button className="navigation__button" onClick={showFavourites}>
          Show Favourites
        </button>
      </div>
      <div className="navigation__item">
        <button className="navigation__button" onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Navigation;
