const bodyPartsMock = require('../mock/bodyParts.json');
const exerciseGroupsMock = require('../mock/exerciseGroups.json');
const exercisesMock = require('../mock/exercises.json');
const trainingPlanMock = require('../mock/trainingPlan.json');
const workoutKindsMock = require('../mock/workoutKinds.json');
const workoutTypesMock = require('../mock/workoutTypes.json');
const usersMock = require('../mock/users.json');

const BodyPart = require('../models/BodyPart');
const WorkoutType = require('../models/WorkoutType');

module.exports = async () => {
    const bodyParts = await BodyPart.find();
    if (bodyParts.length !== bodyPartsMock) {
        await createInitialEntity(BodyPart, bodyPartsMock);
    }

    const workoutTypes = await WorkoutType.find();
    if (workoutTypes.length !== workoutTypesMock) {
        await createInitialEntity(WorkoutType, workoutTypesMock);
    }
};

const createInitialEntity = async (Model, mockData) => {
    await Model.collection.drop();
    return Promise.all(
        mockData.map(async (item) => {
            try {
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
};
