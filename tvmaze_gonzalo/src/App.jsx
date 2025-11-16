import { useState, useEffect } from 'react'
import './App.css'
import ShowGrid from './components/ShowGrid/ShowGrid.jsx'
import Header from './components/Header/Header.jsx'
import ShowDetail from './components/ShowDetail/ShowDetail.jsx'

function App() {
  const [shows, setShows] = useState([])
  const [initialShows, setInitialShows] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState("")
  //Estado para favoritos, inicializado desde localStorage
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const storedFavorites = localStorage.getItem('favoriteIds');
    return storedFavorites ? JSON.parse(storedFavorites) : []
  })
  const [showingFavorites, setShowingFavorites] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  //PAGINACION
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20 //NUMERO DE SERIES POR PAGINA

  //FILTRO Y ORDENACION
  const [sortOption, setSortOption] = useState("none")
  const [minRating, setMinRating] = useState(null)

  //FILTRO POR GENERO E IDIOMA
  const [genreFilter, setGenreFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")
  
    //LISTA DE GENEROS DISPONIBLES
  const availableGenres = Array.from(
    new Set(
      initialShows.flatMap((show) => show.genres || [])
    )
  ).sort()

  //LISTA DE IDIOMAS DISPONIBLES
  const availableLanguages = Array.from(
    new Set(
      initialShows
        .map((show) => show.language)
        .filter((lang) => !!lang)
    )
  ).sort()



    const handleSortChange = (option) => {
    setSortOption(option)
  }

    const handleMinRatingChange = (value) => {
    setMinRating(value)
  }

    //CAMBIO DE GENERO
  const handleGenreChange = (genre) => {
    setGenreFilter(genre)
  }

  //CAMBIO DE IDIOMA
  const handleLanguageChange = (language) => {
    setLanguageFilter(language)
  }



  //Carga inicial
  useEffect(() => {
    const url="https://api.tvmaze.com/shows?page=0"
    fetch(url)
      .then(response => response.json())
      .then((data) => {setShows(data); setInitialShows(data)});
  }, []);


    // GUARDAR FAVORITOS EN LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds))
  }, [favoriteIds])

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

    //APLICAMOS FILTRO DE RATING Y ORDENACION
  let processedShows = filterByLetter.slice()

  //FILTRO POR RATING MINIMO
  if (minRating !== null) {
    processedShows = processedShows.filter((show) => {
      const rating = show.rating?.average ?? 0
      return rating >= minRating
    })
  }
  //FILTRO POR GENERO
  if (genreFilter !== "all") {
    processedShows = processedShows.filter((show) =>
      (show.genres || []).includes(genreFilter)
    )
  }

  //FILTRO POR IDIOMA
  if (languageFilter !== "all") {
    processedShows = processedShows.filter(
      (show) => show.language === languageFilter
    )
  }

  //ORDENACION
  if (sortOption === "name-asc") {
    processedShows.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortOption === "name-desc") {
    processedShows.sort((a, b) => b.name.localeCompare(a.name))
  } else if (sortOption === "rating-desc") {
    processedShows.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
  } else if (sortOption === "rating-asc") {
    processedShows.sort((a, b) => (a.rating?.average ?? 0) - (b.rating?.average ?? 0))
  }


  //CALCULAMOS PAGINACION
  const totalPages = Math.max(1, Math.ceil(processedShows.length / pageSize))

  //AJUSTAMOS LA PAGINA ACTUAL SI NOS PASAMOS (POR EJEMPLO AL CAMBIAR FILTROS)
  if (currentPage > totalPages) {
    setCurrentPage(totalPages)
  }

  const startIndex = (currentPage - 1) * pageSize
  const paginatedShows = processedShows.slice(startIndex, startIndex + pageSize)


  //GESTION FAVORITOS

  const handleFavoriteToggle = (id) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter(favId => favId !== id)); //Si ya está en favoritos, lo quitamos
    } else {
      setFavoriteIds([...favoriteIds, id]); //Si no está en favoritos, lo añadimos
    }
  };

  const showFavorites = () => {
    if (!showingFavorites) {
      const favoriteShows = shows.filter(show => favoriteIds.includes(show.id));
      setShows(favoriteShows);
    } else {
      setShows(initialShows); // o lo que sea tu lista original
    }
    setShowingFavorites(!showingFavorites);
    
};



  
  return (
    <>
    <Header onSearch={handleSearch} onLetterFilter={handleLetterFilter} showFavorites={showFavorites} showingFavorites={showingFavorites} selectedLetter={selectedLetter} sortOption={sortOption} onSortChange={handleSortChange} minRating={minRating} onMinRatingChange={handleMinRatingChange} genreFilter={genreFilter} onGenreChange={handleGenreChange} languageFilter={languageFilter} onLanguageChange={handleLanguageChange} availableGenres={availableGenres} availableLanguages={availableLanguages} />
        
        {/*Mostramos detalle o grid segun si hay una serie seleccionada*/}
        {selectedShow ? (
        <ShowDetail show={selectedShow} onBack={() => setSelectedShow(null)} isFavorite={favoriteIds.includes(selectedShow.id)} onFavoriteToggle={handleFavoriteToggle}/>
        ) : (
        <ShowGrid shows={paginatedShows} onFavoriteToggle={handleFavoriteToggle}  favoriteIds={favoriteIds}  onClickShow={setSelectedShow} totalPages={totalPages} onPageChange={setCurrentPage} currentPage={currentPage} />)}
    </>
  )
}

export default App
