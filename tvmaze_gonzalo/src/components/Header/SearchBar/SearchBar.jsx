import "./SearchBar.css"
export default function SearchBar(){
    return(
        <div>
            <input className="buscador" type="text" placeholder="Buscar series..." />
            <button>Buscar</button>
        </div>
    )
}