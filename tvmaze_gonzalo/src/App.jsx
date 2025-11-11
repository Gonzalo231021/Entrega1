import { useState, useEffect } from 'react'
import './App.css'
import ShowGrid from './components/ShowGrid/ShowGrid.jsx'
import Header from './components/Header/Header.jsx'

function App() {
  const [shows, setShows] = useState([])
  const [initialShows, setInitialShows] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState("")
  const [favoriteIds, setFavoriteIds] = useState([])

  //Carga inicial
  useEffect(() => {
    const url="https://api.tvmaze.com/shows?page=0"
    fetch(url)
      .then(response => response.json())
      .then((data) => {setShows(data); setInitialShows(data)});
  }, []);


  //FILTRO BUSCADOR


  //Recibimos la serie a buscar
  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  useEffect(() => {
    // Comprobamos si el buscador está vacío
    if (!searchTerm.trim()) {
      setShows(initialShows)
      return
    }
    //Si hay texto, hacemos fetch a la API de busqueda
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}` //Usamos encodeURIComponent para evitar errores con espacios, tildes, etc.
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const SearchedSeries = data.map((item) => item.show) //La API devuelve un objeto con mas datos, nos quedamos solo con el nombre
        setShows(SearchedSeries)
      })
      .catch((error) => console.error("No existe dicha serie", error))
  }, [searchTerm]) //Se ehjecuta cada vez que searchTerm cambia




  //FILTRO POR LETRA

  const handleLetterFilter = (letter) => {
    if (letter === selectedLetter) {
      setSelectedLetter("")
    }else{
      setSelectedLetter(letter)
    }
  }

  const filterByLetter = selectedLetter
    ? shows.filter((show) =>
        show.name.toUpperCase().startsWith(selectedLetter.toUpperCase())
      )
    : shows




  
  return (
    <>
    <Header onSearch={handleSearch} onLetterFilter={handleLetterFilter} showFavorites={showFavorites}/>
        <ShowGrid 
          shows={filterByLetter} 
          onFavoriteToggle={handleFavoriteToggle} 
          favoriteIds={favoriteIds} 
        />
      
    </>
  )
}

export default App
