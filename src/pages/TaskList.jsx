
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"


export default function TaskList() {

    const { tasks } = useContext(GlobalContext)

    console.log(tasks)

    return (

        <h1> Homepage TaskList</h1>
    )
}