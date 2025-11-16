import SearchBar from "./SearchBar/SearchBar"
import FavoritesButton from "./FavoritesButton/FavoritesButton"
import FilterSort from "./FilterSort/FilterSort"
import LettersFilter from "./LettersFilter/LettersFilter"
import "./Header.css"
    
export default function Header({onSearch , onLetterFilter, showFavorites, showingFavorites, selectedLetter, sortOption, onSortChange, minRating, onMinRatingChange, genreFilter, onGenreChange, languageFilter, onLanguageChange, availableGenres, availableLanguages}) {
    return (
        <header className="header">
            <div className="header-top">
                <h1 className="header-title">TV Maze App</h1>
                <SearchBar onSearch={onSearch}/>
                <FavoritesButton showFavorites={showFavorites} showingFavorites={showingFavorites} />
                <FilterSort sortOption={sortOption} onSortChange={onSortChange} minRating={minRating} onMinRatingChange={onMinRatingChange} genreFilter={genreFilter} onGenreChange={onGenreChange} languageFilter={languageFilter} onLanguageChange={onLanguageChange} availableGenres={availableGenres} availableLanguages={availableLanguages} />
            </div>
            <div className="header-bottom">
                <LettersFilter onLetterFilter={onLetterFilter} selectedLetter={selectedLetter} />
            </div>
        </header>
    )
}   