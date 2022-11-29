const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        groups: [{ type: Schema.Types.ObjectId, ref: 'ExerciseGroup', required: true }],
        name: { type: String, required: true },
        type: { type: Schema.Types.ObjectId, ref: 'WorkoutType', required: true }
    },
    { timestamps: true }
);

module.exports = model('WorkoutKind', schema);
