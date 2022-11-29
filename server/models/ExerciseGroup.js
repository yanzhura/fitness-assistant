const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        name: { type: String, required: true },
        exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', required: true }]
    },
    { timestamps: true }
);

module.exports = model('ExerciseGroup', schema);
