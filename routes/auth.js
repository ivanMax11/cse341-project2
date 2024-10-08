const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/authController');
const { registerValidator, loginValidation, userIdValidation } = require('../middleware/validators');


// Ruta para registrar un usuario
router.post('/register', registerValidator, register);

// Ruta para iniciar sesión
router.post('/login', loginValidation, login);

// Ruta para obtener todos los usuarios (opcionalmente puede requerir autenticación)
router.get('/users', getAllUsers);

// Ruta para obtener un usuario por ID 
router.get('/users/:id', userIdValidation, getUserById)

// Ruta para actualizar un usuario
router.put('/users/:id', userIdValidation, updateUser);

// Ruta para eliminar usuario
router.delete('/users/:id', userIdValidation, deleteUser);

module.exports = router;
