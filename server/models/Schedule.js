const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        date: { type: Date, required: true },
        workout: { type: Schema.Types.ObjectId, ref: 'TrainingPlan', required: true }
    },
    { timestamps: true }
);

module.exports = model('Schedule', schema);
