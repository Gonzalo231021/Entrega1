export default function FavoritesButton({ showFavorites, showingFavorites }){
    const handleOnClick = () => {
        showFavorites()
    }
    return(
        <button onClick={handleOnClick}>{showingFavorites ? "❤️ Favoritos" : "🤍 Favoritos"}</button>
    )
}