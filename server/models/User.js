const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        completedWorkouts: { type: Number, required: true },
        currentWorkout: { type: Number, required: true },
        schedule: { type: Schema.Types.ObjectId, ref: 'Schedule' },
        trainingFinishedAt: { type: Date },
        trainingStartedAt: { type: Date }
    },
    { timestamps: true }
);

module.exports = model('User', schema);
