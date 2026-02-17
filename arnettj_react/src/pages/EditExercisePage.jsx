import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const EditExercisePage = ({exerciseToEdit}) => {
    const navigate = useNavigate("/")

    // Convert date to YYYY-MM-DD format for HTML date input
    const formatDateForInput = (dateStr) => {
        const parts = dateStr.split('-');
        if (parts.length == 3 && parts[0].length == 2) {
            const [ month, day, year ] = parts;
            return `${year}-${month}-${day}`;
        }
        return ''
    };

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(formatDateForInput(exerciseToEdit.date));

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.status === 200){
            alert("Successfully edited the exercise!");
        } else {
            alert(`Failed to edit exercise, status code: ${response.status}`);
        }
        navigate("/")
        };

    return (
        <div className="pageContent">
            <h1>Edit Exercise</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select 
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                <option value="" disabled>Select a unit</option>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Update</button>
        </div>
    );
}

export default EditExercisePage;