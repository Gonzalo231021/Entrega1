import "./Pagination.css"
export default function Pagination({ totalPages, currentPage, onPageChange }) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };  

    return (
        <div className="pagination">
            <button className="pagination-button" onClick={handlePrevious} disabled={currentPage === 1}>Anterior</button>
            <span>Página {currentPage} de {totalPages}</span>
            <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
    );
}