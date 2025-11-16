import "./SearchBar.css"
import { useState } from "react"

export default function SearchBar({onSearch}){
    //Guardamos lo que el usuario escribe en el buscador
    const [searchTerm, setSearchTerm] = useState("")
    //Si el usuario escribe algo, actualizamos el estado, guardando el valor
    const handleChange= (event)=>{
        setSearchTerm(event.target.value)
    }

    const handleClick = () => {
        onSearch(searchTerm)
    }
    //Comprobamos si se presiona Enter, para hacer la busqueda
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSearch(searchTerm)
        }
    }
    return(
        <div className="search-bar">
            <input className="buscador" type="text" onChange={handleChange} value={searchTerm} placeholder="Buscar series..." onKeyDown={handleKeyDown} />
            <button className="search-button" onClick={handleClick}>Buscar</button>
        </div>
    )
}