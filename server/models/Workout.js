const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        sequenceNumber: { type: Number, required: true },
        type: { type: String, required: true },
        kind: { type: String, required: true },
        level: { type: Number, required: true },
        exerciseGroups: [{ type: String, required: true }],
        exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', required: true }]
    },
    { timestamps: true }
);

module.exports = model('Workout', schema);
