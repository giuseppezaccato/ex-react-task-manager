import { useMemo, useRef, useState, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';


const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
    const { addTask } = useContext(GlobalContext) //derivante dallo spread di dataTasks nel GlobalContext
    const navigate = useNavigate()


    //inizializzo variabili form
    const [title, setTitle] = useState("")
    const descriptionRef = useRef()
    const statusRef = useRef()


    //* useMemo ci aiuta a inizializzare una variabile dinamica
    //?   senza dover usare un Ulteriore `useState` che al suo rendering 
    //?   sfrutta un Ulteriore `useEffect` che al variare della dipendenza [title] lo riRenderizza a sua volta!

    const errorTitle = useMemo(() => {
        //todo Validare il campo Nome (title):

        //todo Il campo non può essere vuoto.
        if (!title.trim())
            return "il Nome Task non puo esser vuoto"

        //todo Non può contenere simboli speciali.
        if ([...title].some(char => symbols.includes(char)))
            return "il Nome Task non puo contenere simboli o caratteri speciali"

        //todo ritorno di default stringa vauota
        return ""
    }, [title])

    //* funzione handleSubmit che riceve l'evento
    const letsGo = async (e) => {
        e.preventDefault()

        const description = descriptionRef.current.value
        const status = statusRef.current.value

        const newTask = {
            title: title.trim(),
            description: description,
            status: status
        }

        //* Eseguire la funzione addTask di useTasks(), passando l’oggetto con title, description e status.
        try {
            await addTask(newTask);

            //? Se la funzione esegue correttamente l'operazione:
            //? Mostrare un alert di conferma dell’avvenuta creazione della task.
            alert("Task aggiunta con successo!")

            //? Resettare il form(...sia controllato che non...)
            setTitle("");
            descriptionRef.current.value = ""; //! status e description NON sono riassegnabili
            statusRef.current.value = "";      //! OCCHIO AI CONST!

        } catch (error) {
            //? Se la funzione lancia un errore:
            //? Mostrare un alert con il messaggio di errore ricevuto.
            // console.error(error)
            alert(error.message)
        }

        navigate("/")
    }


    return (
        <form
            onSubmit={letsGo}
            className='form-grid'
        >

            {/* Title */}
            <label >
                Nome Task
                <input
                    type="text"
                    name='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </label>
            {errorTitle &&
                <p style={{ color: 'red' }}>
                    {errorTitle}
                </p>}

            {/* Description */}
            <label >
                Descrizione
                <textarea
                    name="description"
                    ref={descriptionRef}
                />
            </label>

            {/* Status */}
            <label >
                Stato
                <select
                    name="status"
                    ref={statusRef}
                    defaultValue={"To do"}
                >
                    {/* metodo ingegnoso per risparmiarci del lavoro? UN MAP! 
                    inizializzo direttamente qui un array con le tre stringhe e le mappo per ottenere 3 option */}
                    {/* {["To do", "Doing", "Done"].map((v,i) => <option key={i} value={v}>{v}</option> )} */}

                    <option value="To do"> To do </option>
                    <option value="Doing"> Doing </option>
                    <option value="Done"> Done </option>
                </select>

            </label>

            <button
                type='submit'

                // puoi disabilitarlo se errorTitle è presente
                disabled={errorTitle}
            >
                Aggiungi Task
            </button>

        </form>
    )
}