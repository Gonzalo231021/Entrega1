import ShowCard from "./ShowCard/ShowCard";
import "./ShowGrid.css"
export default function ShowGrid({shows, onFavoriteToggle, favoriteIds}){
    return (
        <div className="show-grid">
            {shows.map(show => (
                <ShowCard 
                    key={show.id} 
                    show={show} 
                    onFavoriteToggle={onFavoriteToggle} 
                    isFavorite={favoriteIds.includes(show.id)} 
                />
            ))}
        </div>
    )
}