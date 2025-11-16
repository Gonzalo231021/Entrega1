import "./SearchBar.css"
import { useState, useEffect } from "react"

export default function SearchBar({onSearch}){
    //GUARDAMOS LO QUE EL USUARIO ESCRIBE EN EL BUSCADOR
    const [searchTerm, setSearchTerm] = useState("")
    //GUARDAMOS LAS SUGERENCIAS DEVUELTAS POR LA API
    const [suggestions, setSuggestions] = useState([])

    //ACTUALIZAMOS EL ESTADO CUANDO EL USUARIO ESCRIBE
    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    //LANZAMOS LA BUSQUEDA CUANDO SE PULSA EL BOTON
    const handleClick = () => {
        onSearch(searchTerm)
        setSuggestions([]) //VACIAMOS LAS SUGERENCIAS
    }

    //LANZAMOS LA BUSQUEDA CUANDO SE PULSA ENTER
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSearch(searchTerm)
            setSuggestions([])
        }
    }

    //CUANDO EL USUARIO HACE CLICK EN UNA SUGERENCIA
    const handleSuggestionClick = (name) => {
        setSearchTerm(name)
        onSearch(name)
        setSuggestions([])
    }

    useEffect(() => {
    //SI EL BUSCADOR ESTÁ VACÍO, NO BUSCAMOS NADA
    if (!searchTerm.trim()) {
        setSuggestions([])
        return
    }

    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
          const shows = data.map(item => item.show)
          setSuggestions(shows.slice(0, 5)) //NOS QUEDAMOS CON 5
      })
      .catch(error => {
          console.error("Error cargando sugerencias", error)
          setSuggestions([])
      })
}, [searchTerm])


    return(
        <div className="search-bar">
            <div className="search-input-wrapper">
                <input 
                    className="buscador" 
                    type="text" 
                    onChange={handleChange} 
                    value={searchTerm} 
                    placeholder="Buscar series..." 
                    onKeyDown={handleKeyDown} 
                />
                <button className="search-button" onClick={handleClick}>Buscar</button>
            </div>

            {/* LISTA DE SUGERENCIAS */}
            {suggestions.length > 0 && (
                <ul className="search-suggestions">
                    {suggestions.map(show => (
                        <li 
                            key={show.id} 
                            className="search-suggestion-item"
                            onClick={() => handleSuggestionClick(show.name)}
                        >
                            {show.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
