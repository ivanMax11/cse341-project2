const User = require('../models/Users');  // Usando la ruta correcta al modelo de usuario
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Registro de usuarios
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear el usuario (sin hashear, ya que el esquema lo hará)
        const newUser = new User({
            username,
            email,
            password // El hasheo ocurre automáticamente en el modelo
        });

        // Guardar el usuario en la base de datos
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro' });
    }
};




// Inicio de sesión de usuarios
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la hasheada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
};



// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Obtener todos los usuarios
        res.status(200).json(users);      // Devolver los usuarios en formato JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por su ID
const getUserById = async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.params.id;  // Obtén el ID del usuario desde los parámetros de la URL
        const { username, email, password } = req.body;  // Extrae los datos del cuerpo de la solicitud
        
        // Verifica si el usuario existe
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Si la contraseña está presente, encripta la nueva contraseña
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;  // Actualiza la contraseña
        }

        // Actualiza otros campos
        user.username = username || user.username;  // Solo actualiza si se proporciona un nuevo valor
        user.email = email || user.email;

        await user.save();  // Guarda los cambios
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.params.id;  // Obtén el ID del usuario desde los parámetros de la URL
        const user = await User.findByIdAndDelete(userId);  // Intenta eliminar el usuario

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });  // Verifica si el usuario existe
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

module.exports = { register, login, getAllUsers, getUserById, updateUser, deleteUser };
