import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="app">
      <header>
        <h1>Workout Tracker</h1>
        <p>An online tool to keep track of your fitness goals!</p>
      </header>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
          <Route path="/create-exercise" element={ <CreateExercisePage />}></Route>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
        </Routes>
      </Router>
      <footer>© 2024 Joshua Arnett</footer>
    </div>
  );
}

export default App;