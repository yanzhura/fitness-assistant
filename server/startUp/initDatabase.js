const exercisesMock = require('../mock/exercises.json');
const workoutsMock = require('../mock/workouts.json');

const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');

module.exports = async () => {
    const exercises = await Exercise.find();
    if (exercises.length !== exercisesMock.length) {
        await createExercises(Exercise, exercisesMock);
    }

    const workouts = await Workout.find();
    if (workouts.length !== workoutsMock.length) {
        await createWorkouts(Exercise, exercisesMock);
    }
};

const createExercises = async () => {
    await Exercise.collection.drop();
    return Promise.all(
        exercisesMock.map(async (ex) => {
            try {
                const newEx = new Exercise(ex);
                await newEx.save();
                return newEx;
            } catch (error) {
                return error;
            }
        })
    );
};

const createWorkouts = async () => {
    await Workout.collection.drop();
    return Promise.all(
        workoutsMock.map(async (w) => {
            const groups = w.exerciseGroups;
            const exerciseIDs = await getExerciseIDs(groups);
            const newWorkout = new Workout({
                ...w,
                exercises: exerciseIDs
            });
            newWorkout.save();
            return newWorkout;
        })
    );
};

const getExerciseIDs = async (groups) => {
    return await Promise.all(
        groups.map(async (g) => {
            const ex = await Exercise.findOne({ group: g, level: 1 });
            return ex._id;
        })
    );
};
