import SearchBar from "./SearchBar/SearchBar"
import "./Header.css"
export default function Header() {
    return (
        <header>
            <h1 className="header-title">TV Maze App</h1>
            <SearchBar />
        </header>
    )
}   