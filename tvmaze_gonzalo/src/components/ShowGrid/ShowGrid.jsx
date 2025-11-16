import ShowCard from "./ShowCard/ShowCard";
import Pagination from "./Pagination/Pagination";
import "./ShowGrid.css"
export default function ShowGrid({shows, onFavoriteToggle, favoriteIds, onClickShow, totalPages, currentPage, onPageChange}) {
    return (
    <>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        <div className="show-grid">
            {shows.map(show => (
                <ShowCard 
                    key={show.id} 
                    show={show} 
                    onFavoriteToggle={onFavoriteToggle} 
                    isFavorite={favoriteIds.includes(show.id)} 
                    onClickShow={onClickShow}
                />
            ))}
           
        </div>
    </>
    )
}