const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        complexityLevel: { type: Number, required: true },
        kind: { type: Schema.Types.ObjectId, ref: 'WorkoutKind', required: true },
        sequenceNumber: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = model('TrainingPlan', schema);
