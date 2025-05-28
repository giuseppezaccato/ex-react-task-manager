//! RICORDA
//? Un custom hook è solo logica JavaScript, non markup, quindi va in `.js` (o `.ts`).
//? Usa `.jsx` solo per componenti che restituiscono JSX.

import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env

export default function useTask() {

    const [tasks, setTasks] = useState();

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


    //* operazioni per ora vuote
    const addTask = (newTask) => {
        //...operazioni
    }
    const removeTask = (taskId) => {
        //...operazioni
    }
    const updateTask = (updTask) => {
        //...operazioni
    }


    //* destructuring di quello che voglio che la funzione ritorni (comprese le operazioni)
    return { tasks, addTask, removeTask, updateTask }


}