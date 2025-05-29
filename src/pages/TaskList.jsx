import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import TaskRow from "../components/TaskRow"


/**
 * TaskList component
 * Visualizza una tabella con l'elenco dei task recuperati dal contesto globale.
 * - Se non ci sono task, mostra un messaggio "nienta da vedere qui".
 * - Altrimenti, per ogni task, renderizza una riga tramite il componente TaskRow.
 * Questo componente si aspetta che il contesto globale (`GlobalContext`)
 * fornisca una proprietà `tasks`, che deve essere un array di oggetti task.
 */

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks) //* controllo stampa dati da api req!

    return (

        <table>
            <thead>
                <tr>
                    <th> <strong> Nome Task </strong> </th>
                    <th> <strong> Stato </strong> </th>
                    <th> <strong> Data Creazione </strong> </th>
                </tr>
            </thead>
            <tbody>
                {
                    // * controllo che tasks non sia false(non esiste) o vuoto(===0)
                    !tasks || tasks.length == 0 ? (
                        <tr>
                            <td colSpan={3}> non c'è nessuna task </td>
                        </tr>
                    ) : tasks.map((task) => (<TaskRow key={task.id} task={task} />))
                }
            </tbody>
        </table>
    )
}