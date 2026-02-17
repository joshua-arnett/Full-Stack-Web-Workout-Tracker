import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_CLASS = "Exercise";

let connection = undefined;
let Exercise = undefined;

async function connect() {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`);
    };
}

function createModel(){
    // Define schema
    const exerciseSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true},
        });

    // We compile the model class from the schema
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isValidDate(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d\d\d-\d\d-\d\d$/;
    return typeof date === 'string' && format.test(date);
}

/**
*
* @param {number} n
* Return true if n is a number and positive integer
*/
function isPositiveInteger(n) {
    return typeof n === 'number' && Number.isInteger(n) && n > 0;
}

/**
*
* @param {number} n
* Return true if n is a positive number
*/
function isPositiveNumber(n) {
    return typeof n === 'number' && n > 0;
}

/**
*
* @param {string} unit
* Return true if unit is either 'kgs' or 'lbs'
*/
function isValidUnit(unit) {
    return unit === 'kgs' || unit === 'lbs';
}

/**
*
* @param {string} date
* Reformat YYYY-MM-DD date format to MM-DD-YYYY format
*/
function reformatDate(date) {
    const dateObject = new Date(date);

    // Adding 1 because the returned date and month numbers are [0-11].
    // padStart ensures the date and month numbers have 2 digits and are preceded with 0 if not.
    const day = String(dateObject.getDate() + 1).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); 
    const year = String(dateObject.getFullYear());
    return `${month}-${day}-${year}`;
}

const createExercise = async (name, reps, weight, unit, date) => {
    // Validate values and types explicitly
    if (typeof name === 'string' && name.length > 0 && 
        isPositiveInteger(reps) &&
        isPositiveNumber(weight) && 
        isValidUnit(unit) && 
        isValidDate(date)) {

        const exercise = new Exercise({
            name: name.trim(), 
            reps: reps, 
            weight: weight, 
            unit: unit, 
            date: reformatDate(date)
        });
        return exercise.save();
    } else{
        return null;
    }
}

// Below is code for two functions not currently in use

// async function findExercises(filter) {
//     return await Exercise.find(filter).exec();
// }

// async function findExercisesById(_id) {
//     return await Exercise.findById(_id).exec();
// }

async function replaceExercise(_id, filter) {
    const { name, reps, weight, unit, date } = filter
    if (typeof name === 'string' && name.length > 0 && 
        isPositiveInteger(reps) &&
        isPositiveNumber(weight) && 
        isValidUnit(unit) && 
        isValidDate(date)) {

        const result = await Exercise.replaceOne(
            {"_id": _id},
            {name: name, reps: reps, weight: weight, unit: unit, date: reformatDate(date)}
        );
        return result.modifiedCount;
    } else{
        return null;
    }
}

async function deleteById(_id) {
    const result = await Exercise.deleteOne({"_id": _id});
    return result.deletedCount;
}

export { connect, createExercise, findExercises, findExercisesById, replaceExercise, deleteById };
