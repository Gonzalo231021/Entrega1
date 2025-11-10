import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [shows, setShows] = useState([])


  useEffect(() => {
  const url="https://api.tvmaze.com/shows?page=0"
  fetch(url)
    .then(response => response.json())
    .then(data => setShows(data));
  }, []);

  return (
    <>
      <h1>Primera página:</h1>
      <ul>
        {shows.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
