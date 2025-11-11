import SearchBar from "./SearchBar/SearchBar"
import FavoritesButton from "./FavoritesButton/FavoritesButton"
import FilterSort from "./FilterSort/FilterSort"
import LettersFilter from "./LettersFilter/LettersFilter"
import "./Header.css"
export default function Header({onSearch , onLetterFilter, showFavorites}){
    return (
        <header>
            <div className="header-top">
                <h1 className="header-title">TV Maze App</h1>
                <SearchBar onSearch={onSearch}/>
                <FavoritesButton showFavorites={showFavorites}/>
                <FilterSort />
            </div>
            <div className="header-bottom">
                <LettersFilter onLetterFilter={onLetterFilter}/>
            </div>
        </header>
    )
}   