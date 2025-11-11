export default function FavoritesButton({ showFavorites }){
    const handleOnClick = () => {
        showFavorites()
    }
    return(
        <button onClick={handleOnClick}>Favoritos</button>
    )
}