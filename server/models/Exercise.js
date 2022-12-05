const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        bodyParts: [{ type: String, required: true }],
        bodyWeight: { type: Boolean, required: true },
        group: { type: String, required: true },
        level: { type: Number, required: true },
        name: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = model('Exercise', schema);
