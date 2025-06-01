//! RICORDA
//? Un custom hook è solo logica JavaScript, non markup, quindi va in `.js` (o `.ts`).
//? Usa `.jsx` solo per componenti che restituiscono JSX.

import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env

export default function useTask() {

    const [tasks, setTasks] = useState([]);//fix va inizializzato come array OVVIAMENTE -.-''

    //* versione async/await con useEffect annesso
    //! (ricorda anche che funzione async NON puo stare dentro a uno useEffect, ma l'invocazione di una funzione async SI)
    // const fetchData = async () => {
    //     try {
    //         const data = await fetch(`${VITE_API_URL}/tasks`)
    //         const task = await data.json()
    //         return task //? ricordati che questa ritorna UNA PROMISE che va risolta per avere il risultato!
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchData().then(data => setTasks(data)); //? appunto il .then che risolve la promise che ritorna fetchData()
    // }, []);

    // //* versione fetch standard
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err))
    }, []);


    //* OPERAZIONI TASK 
    //todo (qui eventualmente poi, applicando le dovute modifiche, lavorare per creare il reducer dello useReducer)

    const addTask = async (newTask) => {
        const res = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',                                 //* metodologia di req
            headers: { 'Content-Type': 'application/json' },//* Specifica il tipo di contenuto inviato nel corpo della richiesta (in questo caso, JSON)
            body: JSON.stringify(newTask),                  //* Converte l'oggetto newTask in una stringa JSON e la invia come corpo della richiesta
        });

        //a questo punto mi serve il "data" quindi dovrei fare...
        // const data = await res.json();//* che destrutturando diventa
        const { success, message, task } = await res.json();

        //* La funzione addTask deve controllare il valore di success nella risposta:

        //? Se success è false, lanciare un errore con message come testo.
        if (!success) throw new Error(message);

        //? Se success è true, aggiornare lo stato globale aggiungendo la nuova task.
        setTasks(prev => [...prev, task])

    }

    const removeTask = async (taskId) => {

        const res = await fetch(`${VITE_API_URL}/tasks/${taskId}`, { method: 'DELETE' });

        const { success, message } = await res.json();

        //* La funzione removeTask deve controllare il valore di success nella risposta:

        //? Se success è false, lanciare un errore con message come testo.
        if (!success) throw new Error(message);

        //? Se success è true, aggiornare lo stato globale aggiungendo la nuova task.
        setTasks(prev => prev.filter((t) => t.id !== taskId))

    }


    const updateTask = async (updTask) => {
        const res = await fetch(`${VITE_API_URL}/tasks/${updTask.id}`, {
            method: 'PUT',                                  //* metodologia di req
            headers: { 'Content-Type': 'application/json' },//* Specifica il tipo di contenuto inviato nel corpo della richiesta (in questo caso, JSON)
            body: JSON.stringify(updTask),                  //* Converte l'oggetto newTask in una stringa JSON e la invia come corpo della richiesta
        });

        const { success, message, task } = await res.json();

        if (!success) throw new Error(message);

        setTasks(prev => prev.map(t =>
            t.id === task.id ? task //* se true sostituisco con task aggiornato
                : t))               //* se false mantengo quello gia esistente

        //ternary dove chiedo se l'id della task modificata(task) coincide con quello dell'elemento nel map t
        //? Se gli ID corrispondono, sostituisce la vecchia versione della task con la nuova versione aggiornata.
        //? Se gli ID non corrispondono, mantiene la task così com'è.

    }


    //* destructuring di quello che voglio che la funzione ritorni (comprese le operazioni)
    return { tasks, addTask, removeTask, updateTask }


}