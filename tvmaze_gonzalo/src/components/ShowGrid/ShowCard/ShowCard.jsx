import "./ShowCard.css"

export default function ShowCard({show, onFavoriteToggle, isFavorite, onClickShow}) {
    const handleOnClick = () => {
        onClickShow(show)
    }
    const handleFavoriteToggle = (e) => {
        e.stopPropagation();
        onFavoriteToggle(show.id);
    };

    return (
        <div className="show-card" onClick={handleOnClick}>
            {show.image && <img src={show.image.medium} alt={show.name} />}

            <div className="show-header">
                <h3 className="show-name">{show.name}</h3>
                <button className="favorite-btn" onClick={handleFavoriteToggle}>{isFavorite ? "❤️" : "🤍"}</button>
            </div>
        </div>
    )
}