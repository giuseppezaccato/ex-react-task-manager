export default function TaskRow({ task }) {

    const { title, status, createdAt } = task //* destrutturo in questo modo

    return (

        <tr>
            <td>{title}</td>
            <td>{status}</td>
            <td>{
                new Date(task.createdAt).toLocaleDateString()
            }</td>
        </tr>

    );
}
