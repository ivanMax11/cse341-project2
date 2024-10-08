// controllers/taskController.js
const Task = require('../models/Task');

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};


// Obtener una tarea por su ID
const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    const { title, description, dueDate, userId } = req.body;

    const newTask = new Task({ title, description, dueDate, userId });
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, completed, userId } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, dueDate, completed, userId },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};

module.exports = { getAllTasks, createTask, getTaskById, updateTask, deleteTask };
