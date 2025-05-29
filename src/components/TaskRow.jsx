import React from "react";
import { Link } from "react-router-dom";

//? avrei potuto anche destrutturare { memo} from 'react' 
//? ==> import {memo} from 'react'
//? e wrappare tutta la funzione anonima dentro a memo(() => {})

const TaskRow = ({ task }) => {

    // const { title, status, id, createdAt } = task; //? destrutturo in questo modo

    // converto la stringa status nella classe creata nel css
    const classStatus = task.status.replace(" ", "").toLowerCase();

    return (
        <tr>
            <td><Link to={`/task/${task.id}`}> {task.title} </Link></td>
            <td className={classStatus}>{task.status}</td>
            {/* creo delle classi con lo stesso nome dello status in modo da dinamicizzarne il colore */}
            <td>
                {new Date(task.createdAt).toLocaleDateString()}
            </td>
        </tr>
    );
};

export default React.memo(TaskRow);
