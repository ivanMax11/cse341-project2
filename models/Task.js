// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true, // Hacer este campo obligatorio
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo de usuario
        required: true,
        ref: 'User', // Asumiendo que el modelo de usuario se llama User
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
