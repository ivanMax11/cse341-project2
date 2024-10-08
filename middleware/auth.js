const jwt = require('jsonwebtoken');

// Middleware para verificar el token
exports.verifyToken = (req, res, next) => {
    // Obtener el token del encabezado Authorization (formato: Bearer <token>)
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    // Verifica si el formato es "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Formato de token inválido' });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }

        // Guardar la información decodificada del usuario en req.user
        req.user = decoded;
        next();
    });
};
