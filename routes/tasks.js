// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

// Ruta para obtener todas las tareas
router.get('/tasks', getAllTasks);

// Ruta para crear una nueva tarea
router.post('/tasks', createTask);

// Ruta para obtener una tarea por su ID
router.get('/tasks/:id', getTaskById);

// Ruta para actualizar una tarea
router.put('/tasks/:id', updateTask);

// Ruta para eliminar una tarea
router.delete('/tasks/:id', deleteTask);

module.exports = router;
