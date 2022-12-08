const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        completedWorkouts: { type: Number },
        currentWorkout: { type: Number },
        schedule: [
            {
                workout: { type: Number },
                date: { type: Date },
                result: {
                    exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
                    count: { type: Number }
                }
            }
        ],
        trainingFinishedAt: { type: Date },
        trainingStartedAt: { type: Date }
    },
    { timestamps: true }
);

module.exports = model('User', schema);
