import SearchBar from "./SearchBar/SearchBar"
import FavoritesButton from "./FavoritesButton/FavoritesButton"
import FilterSort from "./FilterSort/FilterSort"
import "./Header.css"
export default function Header() {
    return (
        <header>
            <h1 className="header-title">TV Maze App</h1>
            <SearchBar />
            <FavoritesButton />
            <FilterSort />
        </header>
    )
}   