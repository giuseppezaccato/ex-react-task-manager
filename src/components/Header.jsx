import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <ul>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/add"} > Aggiungi</NavLink>
            </li>
        </ul>
    )
}