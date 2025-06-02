/**
 * TaskList component
 * Visualizza una tabella con l'elenco dei task recuperati dal contesto globale.
 * - Se non ci sono task, mostra un messaggio "nienta da vedere qui".
 * - Altrimenti, per ogni task, renderizza una riga tramite il componente TaskRow.
 * Questo componente si aspetta che il contesto globale (`GlobalContext`)
 * fornisca una proprietà `tasks`, che deve essere un array di oggetti task.
 */

import { useCallback, useContext, useMemo, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import TaskRow from "../components/TaskRow"

// supporto generic debounce
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks) //* controllo stampa dati da api req!

    //* Aggiungere due state in TaskList.jsx:
    //todo sortBy: rappresenta il criterio di ordinamento (title, status, createdAt)[default = createdAt]
    const [sortBy, setSortBy] = useState("createdAt")
    //todo sortOrder: rappresenta la direzione (1 per crescente, -1 per decrescente)[default = 1]
    const [sortOrder, setSortOrder] = useState(1)

    //todo input controllato searchQuery
    const [searchQuery, setSearchQuery] = useState("")

    //fix debouncedSearch (la closure mantiene il valore del timer tra le chiamate) => serve useCallback()
    //? syntax: useCallback(callback, [dependencies])
    const debouncedSetSearchQuery = useCallback(debounce(setSearchQuery, 500), [])

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
    // * organizedTasks contiene la lista dei task ordinata secondo il criterio e la direzione scelti
    //todo implementare lo state searchQuery in questa variabile...
    const organizedTasks = useMemo(() => {

        //? Per evitare effetti collaterali dovuti a .sort(), usiamo una copia dell'array originale
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {

                let matchup; //? Variabile che conterrà il risultato del confronto tra a e b

                //todo Ordinamento per titolo (alfabetico)
                if (sortBy === 'title') {
                    //? localeCompare restituisce un valore negativo, zero o positivo a seconda dell'ordine alfabetico
                    matchup = a.title.localeCompare(b.title);

                    //todo Ordinamento per stato (To do < Doing < Done)
                } else if (sortBy === 'status') {

                    //? Definire l'ordine desiderato degli stati
                    const options = ["To do", "Doing", "Done"];
                    //? Confrontare gli indici degli stati nell'array options
                    matchup = options.indexOf(a.status) - options.indexOf(b.status);

                    //todo Ordinamento per data di creazione (dal più vecchio al più recente)
                } else if (sortBy === 'createdAt') {
                    //? Convertire le date in millisecondi per confrontarle numericamente
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    matchup = dateA - dateB;
                }

                //todo Moltiplicazione per sortOrder per gestire sia crescente (1) che decrescente (-1)
                return matchup * sortOrder;
            });
    }, [sortBy, tasks, sortOrder, searchQuery]);


    return (
        <div>
            {/* input search */}
            <div className="center-input">
                <input
                    type="text"
                    placeholder="cerca task..."
                    //fix value={searchQuery} removed! per rendere effettivo e funzionale il debounce
                    onChange={((e) => debouncedSetSearchQuery(e.target.value))}
                />
            </div>

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
        </div>
    )
}