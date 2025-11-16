export default function FavoritesButton({ showFavorites, showingFavorites }){
    const handleOnClick = () => {
        showFavorites()
    }
    return(
        <button  className={`favorites-btn ${showingFavorites ? "fav-active" : ""}`} onClick={handleOnClick}>{showingFavorites ? "❤️ Favoritos" : "🤍 Favoritos"}</button>
    )
}