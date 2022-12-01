const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        completedWorkouts: { type: Number, required: true },
        currentWorkout: { type: Number, required: true },
        name: { type: String, required: true },
        schedule: { type: Schema.Types.ObjectId, ref: 'Schedule', required: true },
        trainingFinishedAt: { type: Boolean, required: true },
        trainingStartedAt: { type: Boolean, required: true }
    },
    { timestamps: true }
);

module.exports = model('User', schema);
