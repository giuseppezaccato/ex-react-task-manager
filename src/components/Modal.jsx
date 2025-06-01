import { createPortal } from "react-dom"


export default function Modal({
    title,                      //? titolo della modale
    content,                    //? contenuto principale della modale
    show,                       //? stato booleano che mostra la modale
    onClose,                    //? funzione per chiudere la modale.
    onConfirm,                  //? funzione eseguita al click del bottone di conferma.
    confirmText = "Conferma"    //? ( default "Conferma")testo del bottone di conferma.
}) {
    if (!show) return null

    //*`createPortal` è una funzione di React (precisamente di `react-dom`) che permette di renderizzare un componente
    //* figlio in un nodo DOM diverso da quello gerarchicamente superiore nel React tree.
    //? Syntax=> createPortal(contenuto, nodoDestinazione)
    return createPortal(
        <div className="modalContainer">
            <div className="modal">
                <h2> {title} </h2>
                {content}
                <div className="modalBtns">
                    <button onClick={onClose}> Annulla </button>
                    <button onClick={onConfirm}> {confirmText} </button>
                </div>
            </div>
        </div>,
        document.body
    )
}
