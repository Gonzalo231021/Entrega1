import "./LettersFilter.css"

export default function LettersFilter({ onLetterFilter, selectedLetter }) {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

    return (
        <div className="letters-filter">
            {letters.map(letter => (
                <button 
                    key={letter}
                    className={
                        `letter-btn ${selectedLetter === letter ? "active" : ""}`
                    }
                    onClick={() => onLetterFilter(letter)}
                >
                    {letter}
                </button>
            ))}
        </div>
    )
}
