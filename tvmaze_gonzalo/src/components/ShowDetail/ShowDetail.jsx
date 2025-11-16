import "./ShowDetail.css"

export default function ShowDetail({ show, onBack, isFavorite, onFavoriteToggle }) {
    if (!show) return null

    //IMAGEN PRINCIPAL
    const imageUrl = show.image?.original || show.image?.medium

    //DATOS BÁSICOS
    const rating = show.rating?.average ?? "N/A"
    const genres = show.genres?.length ? show.genres.join(" · ") : "Sin género"

    //HORARIO DE EMISIÓN
    const scheduleText = show.schedule
        ? `${(show.schedule.days || []).join(", ")} ${show.schedule.time || ""}`.trim()
        : "Sin horario"

    return (
        <div className="show-detail">

            {/* BOTÓN VOLVER */}
            <button className="back-button" onClick={onBack}>← Volver</button>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="detail-content">

                {/* IMAGEN DE LA SERIE */}
                <div className="detail-image">
                    {imageUrl && <img src={imageUrl} alt={show.name} />}
                </div>

                {/* INFORMACIÓN DETALLADA */}
                <div className="detail-info">

                    {/* TITULO Y FAVORITO */}
                    <div className="detail-header">
                        <h1 className="detail-title">{show.name}</h1>

                        <button
                            className={`favorite-button ${isFavorite ? "favorite-button--active" : ""}`}
                            onClick={() => onFavoriteToggle(show.id)}
                        >
                            {isFavorite ? "♥" : "♡"}
                        </button>
                    </div>

                    {/* DATOS DE LA SERIE */}
                    <div className="detail-meta">
                        <p><strong>Rating:</strong> {rating}</p>
                        <p><strong>Géneros:</strong> {genres}</p>
                        <p><strong>Idioma:</strong> {show.language || "Desconocido"}</p>

                        <p>
                            <strong>Fechas:</strong> {show.premiered || "¿?"}
                            {show.ended ? ` – ${show.ended}` : ""}
                        </p>

                        <p><strong>Estado:</strong> {show.status || "Desconocido"}</p>
                        <p><strong>Horario:</strong> {scheduleText}</p>

                        {show.officialSite && (
                            <p>
                                <strong>Web oficial: </strong>
                                <a href={show.officialSite} target="_blank" rel="noreferrer">
                                    {show.officialSite}
                                </a>
                            </p>
                        )}
                    </div>

                </div>
            </div>

            {/* SINOPSIS */}
            <div className="detail-synopsis">
                <h2>Sinopsis</h2>

                <div
                    className="detail-summary"
                    dangerouslySetInnerHTML={{
                        __html: show.summary || "<p>Sin sinopsis disponible.</p>"
                    }}
                />
            </div>

        </div>
    )
}
