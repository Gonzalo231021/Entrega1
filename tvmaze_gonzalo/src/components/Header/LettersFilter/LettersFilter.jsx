import "./LettersFilter.css"
export default function LettersFilter(){
    const letters = []; //Array vacio de letras

    //Generamos letra de la A a la Z usando codigo ASCII (A=65, Z=90)
    for (let i = 65; i <= 90; i++) {
        letters.push(String.fromCharCode(i));
    }

    return ( 
        <div>
            {letters.map((letter) => (
                <button key={letter} >{letter}</button>
            ))}
        </div>
    )
}