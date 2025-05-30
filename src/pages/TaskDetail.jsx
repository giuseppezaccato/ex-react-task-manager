import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import Modal from "../components/Modal"


export default function TaskDetail() {
    const { id } = useParams() //ritorna una stringa NON un numero
    const navigate = useNavigate()
    const { tasks, removeTask } = useContext(GlobalContext)


    //cerco la task con quell'id!
    const task = tasks.find(t => t.id === parseInt(id))

    //visualizzazione Modale
    const [showModal, setShowModal] = useState(false)

    // !task && <h2>Task non trovata!</h2>
    if (!task) {
        return <h2>Task non trovata</h2>
    }

    // Funzione per gestire l'eliminazione della task
    const handleDel = async () => {
        try {

            //todo Rimuove la task tramite la funzione dal context
            await removeTask(task.id)

            //todo Mostra un messaggio di conferma
            alert("Task eliminata")

            //todo Torna alla home page dopo l'eliminazione
            navigate("/")

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }


    return (

        <div>
            <h1>Dettagli Task</h1>
            <h4> <strong> Nome:</strong> {task.title} </h4>
            <h4> <strong> Descrizione:</strong> {task.description} </h4>
            <h4> <strong> Stato:</strong> {task.status} </h4>
            <h4> <strong> Data di Creazione:</strong> {new Date(task.createdAt).toLocaleDateString()} </h4>
            <button
                //fix onClick={handleDel} l'eliminazione ora la si demanda alla Modale 
                //? quindi questo onClick la aprirà e il suo onConfirm farà quello che sta facendo ora questo onClick
                onClick={() => setShowModal(true)}

            >Elimina Task</button>

            {/* Modal */}
            <Modal
                title="Elimina Task"
                content={<p>"Sei Sicuro?"</p>}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDel}
                confirmText="Elimina"
            />
        </div>
    )
}