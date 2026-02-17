import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ exercises, onDelete, onEdit }) {
    return (
        <div className="table-wrapper">
            <table className="collection-container">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date (MM-DD-YYYY)</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} 
                            onDelete={onDelete} onEdit={onEdit} key={i} />)}
                </tbody>
            </table>
        </div>
    );
}

export default ExerciseCollection;