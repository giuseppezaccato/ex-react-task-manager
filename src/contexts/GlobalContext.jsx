import { createContext, useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env

export const GlobalContext = createContext(); // Creo un nuovo contesto chiamato GlobalContext


// Definisco il componente provider che avvolgerà i componenti figli
export function GlobalProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    //* versione async/await con useEffect annesso
    //! (ricorda anche che funzione async NON puo stare dentro a uno useEffect,
    //! ma l'invocazione di una funzione async SI)

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
    //     fetchData().then(data => setTasks(data)); //? appunto il .then che risolve la promise di ritorno da fetchData()
    // }, []);

    // //* versione fetch standard
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err))
    }, []);


    return (
        // Fornisco il contesto ai componenti figli tramite il Provider
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children} {/* Renderizzo i componenti figli passati a GlobalProvider */}
        </GlobalContext.Provider >
    )
}

