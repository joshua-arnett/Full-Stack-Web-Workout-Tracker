import ExerciseCollection from '../components/ExerciseCollection';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    const navigate = useNavigate()
    const [exercises, setExercises] = useState([]);
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }
      
    useEffect(() => {
        loadExercises(); 
       }, []);
    
    const onDelete = async (_id) => {
    const response = await fetch(
        `/exercises/${_id}`,
        {method: "DELETE"}
    );
    if (response.status === 204){
        setExercises(exercises.filter(ex => ex._id !== _id))
        alert(`Successfully deleted exercise!`)
    } else {
        alert(`Failed to delete exercise, status code: ${response.status}`)
    }}

    const onEdit = async (exercise) => {
        setExerciseToEdit(exercise)
        navigate("/edit-exercise")
    }

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>
        </>
    );
}

export default HomePage;