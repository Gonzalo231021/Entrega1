import "./ShowCard.css"

export default function ShowCard({show, onFavoriteToggle, isFavorite}){
    return (
        <div className="show-card">
            {show.image && <img src={show.image.medium} alt={show.name} />}

            <div className="show-header">
                <h3 className="show-name">{show.name}</h3>
                <button className="favorite-btn" onClick={()=>onFavoriteToggle(show.id)}>{isFavorite ? "❤️" : "🤍"}</button>
            </div>
        </div>
    )
}