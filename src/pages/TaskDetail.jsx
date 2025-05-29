import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"


export default function TaskDetail() {
    const { id } = useParams() //ritorna una stringa NON un numero
    const { tasks, removeTask } = useContext(GlobalContext)

    //cerco la task con quell'id!
    const task = tasks.find(t => t.id === parseInt(id))

    // !task && <h2>Task non trovata!</h2>
    if (!task) {
        return <h2>Task non trovata</h2>
    }


    return (

        <div>
            <h1>Dettagli Task</h1>
            <h4> <strong> Nome:</strong> {task.title} </h4>
            <h4> <strong> Descrizione:</strong> {task.description} </h4>
            <h4> <strong> Stato:</strong> {task.status} </h4>
            <h4> <strong> Data di Creazione:</strong> {new Date(task.createdAt).toLocaleDateString()} </h4>
            <button onClick={removeTask}>Elimina Task</button>
        </div>
    )
}