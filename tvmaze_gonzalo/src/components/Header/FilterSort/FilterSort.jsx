import "./FilterSort.css"
import { useState } from "react"

//MENU LATERAL DE FILTRO Y ORDENACION
export default function FilterSort({ sortOption, minRating, onSortChange, onMinRatingChange, genreFilter, onGenreChange, languageFilter, onLanguageChange, availableGenres, availableLanguages}) {

    //CONTROLAMOS SI EL PANEL ESTA ABIERTO
    const [isOpen, setIsOpen] = useState(false)

    //ABRIR O CERRAR PANEL
    const handleTogglePanel = () => {
        setIsOpen(!isOpen)
    }

    //CAMBIO DE ORDENACION
    const handleSortChangeLocal = (event) => {
        onSortChange(event.target.value)
    }

    //CAMBIO DE GENERO
    const handleGenreChangeLocal = (event) => {
        onGenreChange(event.target.value)
    }

    //CAMBIO DE IDIOMA
    const handleLanguageChangeLocal = (event) => {
        onLanguageChange(event.target.value)
    }


    //CAMBIO DE FILTRO DE RATING
    const handleMinRatingChangeLocal = (event) => {
        const value = event.target.value === "none" ? null : Number(event.target.value)
        onMinRatingChange(value)
    }

    //RESETEAR FILTROS
    const handleClearFilters = () => {
        onSortChange("none")
        onMinRatingChange(null)
        onGenreChange("all")
        onLanguageChange("all")
    }

    return (
        <div className="filter-sort">
            {/* BOTON PRINCIPAL */}
            <button className="filter-sort-btn" onClick={handleTogglePanel}>
                Filtrar y Ordenar
            </button>

            {/* FONDO OSCURO DETRAS DEL PANEL */}
            {isOpen && (
                <div className="filter-overlay" onClick={handleTogglePanel}></div>
            )}

            {/* PANEL LATERAL DERECHO */}
            {isOpen && (
                <div className="filter-panel">
                    <h2 className="filter-title">Filtrar y ordenar</h2>

                    {/* ORDENACION */}
                    <div className="filter-section">
                        <h3>Ordenar por</h3>
                        <label>
                            <input
                                type="radio"
                                value="none"
                                checked={sortOption === "none"}
                                onChange={handleSortChangeLocal}
                            />
                            Sin orden especial
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="name-asc"
                                checked={sortOption === "name-asc"}
                                onChange={handleSortChangeLocal}
                            />
                            Nombre (A - Z)
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="name-desc"
                                checked={sortOption === "name-desc"}
                                onChange={handleSortChangeLocal}
                            />
                            Nombre (Z - A)
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="rating-desc"
                                checked={sortOption === "rating-desc"}
                                onChange={handleSortChangeLocal}
                            />
                            Rating (de mayor a menor)
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="rating-asc"
                                checked={sortOption === "rating-asc"}
                                onChange={handleSortChangeLocal}
                            />
                            Rating (de menor a mayor)
                        </label>
                    </div>

                    {/* FILTRO DE RATING */}
                    <div className="filter-section">
                        <h3>Filtrar por rating mínimo</h3>
                        <label>
                            <input
                                type="radio"
                                value="none"
                                checked={minRating === null}
                                onChange={handleMinRatingChangeLocal}
                            />
                            Todas las series
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="7"
                                checked={minRating === 7}
                                onChange={handleMinRatingChangeLocal}
                            />
                            7 o más
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="8"
                                checked={minRating === 8}
                                onChange={handleMinRatingChangeLocal}
                            />
                            8 o más
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="9"
                                checked={minRating === 9}
                                onChange={handleMinRatingChangeLocal}
                            />
                            9 o más
                        </label>
                    </div>
                    {/* FILTRO DE GENERO */}
                    <div className="filter-section">
                        <h3>Filtrar por género</h3>
                        <select
                            className="filter-select"
                            value={genreFilter}
                            onChange={handleGenreChangeLocal}
                        >
                            <option value="all">Todos los géneros</option>
                            {availableGenres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* FILTRO DE IDIOMA */}
                    <div className="filter-section">
                        <h3>Filtrar por idioma</h3>
                        <select
                            className="filter-select"
                            value={languageFilter}
                            onChange={handleLanguageChangeLocal}
                        >
                            <option value="all">Todos los idiomas</option>
                            {availableLanguages.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* BOTONES INFERIORES */}
                    <div className="filter-actions">
                        <button className="filter-clear-btn" onClick={handleClearFilters}>
                            Limpiar filtros
                        </button>
                        <button className="filter-close-btn" onClick={handleTogglePanel}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
