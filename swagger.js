const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API User and Task Management',
    description: 'API for managing users and tasks',
  },
  host: 'localhost:3000', // Cambia a tu host si usas otro
  schemes: ['http'], // Cambia a 'https' si es necesario
};

const outputFile = './swagger-output.json'; // El archivo que se generará
const endpointsFiles = ['./routes/auth.js', './routes/tasks.js']; // Archivos que contienen las rutas

// Generar la documentación
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server');
});
