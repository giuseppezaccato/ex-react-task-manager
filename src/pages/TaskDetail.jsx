import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"


export default function TaskDetail() {
    const { id } = useParams() //ritorna una stringa NON un numero
    const navigate = useNavigate()
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)


    //cerco la task con quell'id!
    const task = tasks.find(t => t.id === parseInt(id))

    //visualizzazione Modale Delete
    const [showDelModal, setShowDelModal] = useState(false)

    //visualizzazione Modale Edit
    const [showEditModal, setShowEditModal] = useState(false)

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

    // Funzione per gestire la modifica della task
    const handleUpd = async (updTask) => {
        try {
            //todo Modifica la task tramite la funzione dal context
            await updateTask(updTask)

            //todo Chiude la Modale Edit
            setShowEditModal(false)

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
                onClick={() => setShowDelModal(true)}
            >Elimina Task</button>
            <button onClick={() => setShowEditModal(true)} >Modifica Task</button>

            {/* Modale Del */}
            <Modal
                title="Elimina Task"
                content={<h3>"Sei Sicuro?"</h3>}
                show={showDelModal}
                onClose={() => setShowDelModal(false)}
                onConfirm={handleDel}
                confirmText="Elimina"
            />

            {/* Modale Edit */}
            <EditTaskModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpd}
                task={task}
            />
        </div>
    )
}