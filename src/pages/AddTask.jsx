import { useMemo, useRef, useState } from 'react'

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {


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

    //funzione handleSubmit che riceve l'evento
    const letsGo = (e) => {
        e.preventDefault()

        const description = descriptionRef.current.value
        const status = statusRef.current.value


        const newTask = {
            nome: { title },
            descrizione: { description },
            stato: { status }
        }
        console.log(newTask)
    }


    return (
        <form
            onSubmit={letsGo}
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