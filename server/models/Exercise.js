const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        bodyParts: [{ type: String, required: true }],
        bodyWeight: { type: Boolean, required: true },
        description: {
            photoId: { type: Number },
            execution: { type: String },
            completion: { type: String },
            anotation: { type: String }
        },
        group: { type: String, required: true },
        level: { type: Number, required: true },
        name: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = model('Exercise', schema);
