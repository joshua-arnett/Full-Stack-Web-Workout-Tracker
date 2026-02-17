import 'dotenv/config';
import asyncHandler from 'express-async-handler';
import * as exercisesModel from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercisesModel.connect(false);
    console.log(`Server listening on port: ${PORT}...`);
})

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    const exercise = await exercisesModel.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);

    if (exercise !== null){
        res.status(201).json(exercise)
    } else{
        res.status(400).json({ Error: "Invalid request"})
    }
}));

/**
 * Retrieve all exercises. 
 */
app.get('/exercises', asyncHandler(async (req, res) => {
    const listOfExercises = await exercisesModel.findExercises({});
    res.json(listOfExercises);
}));


/**
 * Retrieve the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercisesModel.findExercisesById(req.params._id);
    if (exercise !== null) {
        res.json(exercise);
    } else {
        res.status(404).json({ Error: 'Not found' });
    }
}));

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    const numUpdated = await exercisesModel.replaceExercise(req.params._id, req.body);
    if (numUpdated === 1) {
        const updatedExercise = await exercisesModel.findExercisesById(req.params._id);
        res.status(200).json(updatedExercise);
    } 
    else if (numUpdated === 0) {
        res.status(404).json({ Error: 'Not found' });
    }
    else if (numUpdated === null){
        res.status(400).json({ Error: "Invalid request"});
    }
}));

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const deletedCount = await exercisesModel.deleteById(req.params._id);
    if (deletedCount === 1) {
        res.status(204).send();
    } else {
        res.status(404).json({ Error: 'Not found' });
    }
}));


