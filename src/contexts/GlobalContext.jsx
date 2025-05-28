import { createContext } from "react";

// integrazione custom hook
import useTasks from "../hooks/useTasks";

export const GlobalContext = createContext(); // Creo un nuovo contesto chiamato GlobalContext


// Definisco il componente provider che avvolgerà i componenti figli
export function GlobalProvider({ children }) {

    //todo tutto useState/useEffect e i relativi fetch sono finiti nel customHook
    //* al suo posto importiamo il customHook destrutturato

    // const { tasks, addTask, removeTask, updateTask } = useTasks() //* anche un nome unico va bene!
    const dataTasks = useTasks() //* facilita poi con lo spread il passaggio delle proprietà evitando errori di scrittura...


    return (
        // Fornisco il contesto ai componenti figli tramite il Provider
        <GlobalContext.Provider value={{ ...dataTasks }}>
            {children} {/* Renderizzo i componenti figli passati a GlobalProvider */}
        </GlobalContext.Provider >
    )
}

