import '../App.css';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";


function ExerciseItem({ exercise, onDelete, onEdit }) {

    return (
        <tr className="collection-item">
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td className='editButton'>
                <FaPen size={16} onClick={e => {e.preventDefault(); onEdit(exercise)}}>Edit</FaPen>
            </td>
            <td className='deleteButton'>
                <MdDelete size={20} onClick={e => {e.preventDefault(); onDelete(exercise._id)}}>Delete </MdDelete>
            </td>
        </tr>
    );
}

export default ExerciseItem;