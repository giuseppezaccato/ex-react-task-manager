import { useState, useRef } from "react";
import Modal from './Modal'

export default function EditTaskModal({
    //todo Deve accettare i seguenti props:
    show,       // (boolean): determina se la modale è visibile.
    onClose,    // (function): funzione per chiudere la modale.
    task,       // (object): oggetto che rappresenta il task da modificare.
    onSave      // (function): funzione che viene chiamata al salvataggio con il task aggiornato.(dovrebbe andare a finire nell'onSubmit)
}) {
    // ref del form
    const formRef = useRef()


    // stato locale con il valore iniziale di 'task'.
    const [editedTask, setEditedTask] = useState(task);


    // Aggiorno editedTask modificanbdo una specifica proprietà
    const modEditedTask = (key, e) => {
        setEditedTask(prev => ({ ...prev, [key]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSave(editedTask)
    }


    // Destrutturo per rendere più semplice usare questi valori nel componente.
    const { title, description, status } = editedTask

    //todo Utilizzare il componente Modal per creare la modale di modifica, passandogli i seguenti valori:
    // title: "Modifica Task".
    // content: un form contenente i campi del task da modificare.
    // confirmText: "Salva".
    // onConfirm: deve attivare il submit del form.
    return (

        <Modal
            title="Modifica Task"
            content={
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <label>
                        Nome Task:
                        <input
                            type="text"
                            value={title}
                            onChange={e => modEditedTask('title', e)}
                        />
                    </label>
                    <label>
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={e => modEditedTask('description', e)}
                        />
                    </label>

                    <label>
                        Stato:
                        <select
                            value={status}
                            onChange={e => modEditedTask('status', e)}
                        >
                            {["To do", "Doing", "Done"].map((v, i) => <option key={i} value={v}> {v} </option>)}
                        </select>
                    </label>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}

            // Simula il submit del form quando viene confermato (onConfirm).
            // Questo richiama il metodo nativo requestSubmit() sul form referenziato da formRef,
            // attivando la validazione e l'handleSub dell'onSubmit come se l'utente avesse inviato il form manualmente.
            onConfirm={() => formRef.current.requestSubmit()}
        />
    )

}
