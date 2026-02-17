import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const CreateExercisePage = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code: ${response.status}`);
        }
        navigate("/")
        };

    return (
        <div className="pageContent">
            <h1>Add Exercise </h1>
            <input
                type="text"
                placeholder="Enter exercise here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
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
                placeholder="Choose Date:"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;