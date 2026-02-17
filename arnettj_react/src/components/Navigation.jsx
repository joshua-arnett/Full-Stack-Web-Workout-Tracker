import "../App.css";
import { Link } from "react-router-dom";

function Navigation(){
    return(
        <nav className="app-nav">
            <Link className="homeButton" to="/">Home</Link>
            <Link className="createExerciseButton" to="/create-exercise">Create Exercise</Link>
        </nav>
    );
}

export default Navigation;