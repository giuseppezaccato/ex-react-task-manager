/**
 * TaskList component
 * Visualizza una tabella con l'elenco dei task recuperati dal contesto globale.
 * - Se non ci sono task, mostra un messaggio "nienta da vedere qui".
 * - Altrimenti, per ogni task, renderizza una riga tramite il componente TaskRow.
 * Questo componente si aspetta che il contesto globale (`GlobalContext`)
 * fornisca una proprietà `tasks`, che deve essere un array di oggetti task.
 */

import { useContext, useMemo, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import TaskRow from "../components/TaskRow"


export default function TaskList() {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks) //* controllo stampa dati da api req!

    //* Aggiungere due state in TaskList.jsx:
    //todo sortBy: rappresenta il criterio di ordinamento (title, status, createdAt)[default = createdAt]
    const [sortBy, setSortBy] = useState("createdAt")
    //todo sortOrder: rappresenta la direzione (1 per crescente, -1 per decrescente)[default = 1]
    const [sortOrder, setSortOrder] = useState(1)

    //* Modificare la tabella per rendere cliccabili le intestazioni
    //todo questa funziona deve partire all'onClick dove cambia solo la stringa passata come criterio di ordinamento
    const sortingFunctionBy = (string) => {
        //ternary + IIFE
        sortBy === string ? setSortOrder(prev => prev * -1)
            : ((() => {
                setSortBy(string);
                setSortOrder(1)
            })())

        //? if/else tradizionale(PIU LEGGIBILE)
        // if (sortBy === string) {
        //     setSortOrder(prev => prev * -1)
        // } else {
        //     setSortBy(string);
        //     setSortOrder(1)
        // }
    }

    const sortingArrow = sortOrder === 1 ? "⇩" : "⇧"

    //* Implementare la logica di ordinamento con useMemo()
    const organizedTasks = useMemo(() => {

        //? Per evitare effetti collaterali(dovuti all'effetto manipolativo di .sort()), 
        //? usa sempre una copia dell'array con lo spread operator.
        //? organizedTasks conterrà la versione ordinata e aggiornata dei tasks.
        return [...tasks].sort((a, b) => {

            //variabile per salvare l'ordinamente
            let matchup;

            //QUALE ordinamento prendere in considerazione
            if (sortBy === 'title') {
                matchup = a.title.localeCompare(b.title) //ordine crescente

            } else if (sortBy === 'status') {
                const options = ["To do", "Doing", "Done"];
                matchup = options.indexOf(a.status) - options.indexOf(b.status) //ordine crescente

            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()
                matchup = dateA - dateB
            }
            return matchup * sortOrder
        })
    }, [sortBy, tasks, sortOrder])




    return (

        <table>
            <thead>
                <tr>
                    <th
                        onClick={() => sortingFunctionBy('title')}>
                        <strong>
                            Nome Task
                            {sortBy === 'title' && sortingArrow}

                        </strong>
                    </th>
                    <th
                        onClick={() => sortingFunctionBy('status')}>
                        <strong>
                            Stato
                            {sortBy === 'status' && sortingArrow}
                        </strong>
                    </th>
                    <th
                        onClick={() => sortingFunctionBy('createdAt')}>
                        <strong>
                            Data Creazione
                            {sortBy === 'createdAt' && sortingArrow}
                        </strong>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    // * controllo che tasks non sia false(non esiste) o vuoto(===0)
                    !tasks || tasks.length == 0 ? (
                        <tr>
                            <td colSpan={3}> non c'è nessuna task </td>
                        </tr>
                    ) : organizedTasks.map((task) => (<TaskRow key={task.id} task={task} />))
                }
            </tbody>
        </table>
    )
}