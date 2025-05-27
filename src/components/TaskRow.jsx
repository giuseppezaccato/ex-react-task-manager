import React from "react";

//? avrei potuto anche destrutturare { memo} from 'react' 
//? ==> import {memo} from 'react'
//? e wrappare tutta la funzione anonima dentro a memo(() => {})

const TaskRow = ({ task }) => {

    const { title, status } = task; // destrutturo in questo modo

    // converto la stringa status nella classe creata nel css
    const classStatus = status.replace(" ", "").toLowerCase();

    return (
        <tr>
            <td>{title}</td>
            <td className={classStatus}>{status}</td>
            {/* creo delle classi con lo stesso nome dello status in modo da dinamicizzarne il colore */}
            <td>
                {new Date(task.createdAt).toLocaleDateString()}
            </td>
        </tr>
    );
};

export default React.memo(TaskRow);
