const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        bodyParts: [{ type: Schema.Types.ObjectId, ref: 'BodyPart', required: true }],
        bodyWeight: { type: Boolean, required: true },
        level: { type: Number, required: true },
        name: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = model('Exercise', schema);
