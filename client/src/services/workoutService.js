import httpService from './httpService';

const trainingPlanLocation = 'trainingPlan';
const workoutKindsLocation = 'workoutKinds';
const workoutTypesLocation = 'workoutTypes';
const exerciseGroupsLocation = 'exerciseGroups';
const exercisesLocation = 'exercises';
const bodyPartsLocation = 'bodyParts';

const fetchExercises = async () => {
    const { data: exercises } = await httpService.get('/exercise');
    return exercises;
};

const fetchTrainingPlan = async () => {
    const { data: fullTrainingPlan } = await httpService.get('/workout');
    return fullTrainingPlan;
};

const fetchWorkoutBySeqNumber = async (workoutSeqNumber) => {
    let number;
    if (workoutSeqNumber >= 1 && workoutSeqNumber <= 9) {
        number = '0' + workoutSeqNumber;
    } else {
        number = workoutSeqNumber;
    }
    const { data: workout } = await httpService.get(`${trainingPlanLocation}/workout${number}.json`);
    const { data: workoutKind } = await httpService.get(`${workoutKindsLocation}/${workout.kind}.json`);
    const { data: workoutType } = await httpService.get(`${workoutTypesLocation}/${workoutKind.type}.json`);
    const exercises = {};
    for (const g of workoutKind.groups) {
        const { data: exerciseGroup } = await httpService.get(`${exerciseGroupsLocation}/${g}.json`);
        const exercise = await fetchExercise(exerciseGroup.exercises, workout.complexityLevel);
        exercises[exercise.key] = {
            group: exerciseGroup.name,
            name: exercise.name,
            bodyWeight: exercise.bodyWeight,
            bodyParts: exercise.bodyPartNames
        };
    }

    const fullWorkout = {
        sequenceNumber: workout.sequenceNumber,
        complexityLevel: workout.complexityLevel,
        kindName: workoutKind.name,
        typeName: workoutType.name,
        exercises
    };
    return fullWorkout;
};

const fetchExercise = async (exercises, complexityLevel) => {
    for (const ex of exercises) {
        const { data: exercise } = await httpService.get(`${exercisesLocation}/${ex}.json`);
        if (exercise.level === complexityLevel) {
            const bodyPartNames = await fetchBodyParts(exercise.bodyParts);
            return {
                key: ex,
                bodyWeight: exercise.bodyWeight,
                name: exercise.name,
                bodyPartNames
            };
        }
    }
};

const fetchBodyParts = async (bodyPartsKeys) => {
    const bodyParts = {};
    for (const bp of bodyPartsKeys) {
        const { data: bodyPart } = await httpService.get(`${bodyPartsLocation}/${bp}.json`);
        bodyParts[bp] = {
            name: bodyPart.name
        };
    }
    return bodyParts;
};

const fetchExerciseGroups = async () => {
    const { data: exerciseGroups } = await httpService.get(`${exerciseGroupsLocation}.json`);
    return exerciseGroups;
};

export default {
    fetchExercises,
    fetchTrainingPlan,
    fetchWorkoutBySeqNumber,
    fetchExerciseGroups
};
