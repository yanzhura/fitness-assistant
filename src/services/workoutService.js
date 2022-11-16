import httpService from './httpService';

const trainingPlanLocation = 'trainingPlan';
const workoutKindsLocation = 'workoutKinds';
const workoutTypesLocation = 'workoutTypes';
const exerciseGroupsLocation = 'exerciseGroups';
const exercisesLocation = 'exercises';
const bodyPartsLocation = 'bodyParts';

const fetchFullTrainingPlan = async () => {
    const { data: trainingPlan } = await httpService.get(`${trainingPlanLocation}.json`);
    const { data: workoutKinds } = await httpService.get(`${workoutKindsLocation}.json`);
    const { data: workoutTypes } = await httpService.get(`${workoutTypesLocation}.json`);
    const { data: exerciseGroups } = await httpService.get(`${exerciseGroupsLocation}.json`);
    const fullTrainingPlan = bindTrainingPlanData(trainingPlan, workoutKinds, workoutTypes, exerciseGroups);
    return fullTrainingPlan;
};

const bindTrainingPlanData = (trainingPlan, workoutKinds, workoutTypes, exerciseGroups) => {
    const fullTrainingPlan = [];
    for (const key in trainingPlan) {
        const { kind, complexityLevel, sequenceNumber } = trainingPlan[key];
        const { name: kindName, type, groups } = workoutKinds[kind];
        const { name: typeName } = workoutTypes[type];
        const exerciseGroupNames = [];
        for (const group of groups) {
            exerciseGroupNames.push(exerciseGroups[group].name);
        }
        const workout = {
            sequenceNumber,
            complexityLevel,
            kindName,
            typeName,
            exerciseGroupNames
        };
        fullTrainingPlan.push(workout);
    }
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
    const exercises = [];
    for (const g of workoutKind.groups) {
        const { data: exerciseGroup } = await httpService.get(`${exerciseGroupsLocation}/${g}.json`);
        const exercise = await fetchExercise(exerciseGroup.exercises, workout.complexityLevel);
        exercises.push({
            group: exerciseGroup.name,
            name: exercise.name,
            bodyParts: exercise.bodyPartNames
        });
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
                name: exercise.name,
                bodyPartNames
            };
        }
    }
};

const fetchBodyParts = async (bodyParts) => {
    const bodyPartNames = [];
    for (const bp of bodyParts) {
        const { data: bodyPart } = await httpService.get(`${bodyPartsLocation}/${bp}.json`);
        bodyPartNames.push(bodyPart.name);
    }
    return bodyPartNames;
};

export default {
    fetchFullTrainingPlan,
    fetchWorkoutBySeqNumber
};
