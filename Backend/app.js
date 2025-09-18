const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const path = require('path');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

// 🖼️ Servir imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API con Swagger',
      version: '1.0.0',
      description: 'APIS del banckend Trinity',
    }
  },
  apis: ['./app.js', './routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔀 Rutas
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/categories', require('./routes/categoriy.routes'));
app.use('/api/movements', require('./routes/movements.routes'));
app.use('/api/stock', require('./routes/stock.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api/salidas', require('./routes/salidas.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));

// 🔄 Sincronización y servidor
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('🔄 Tablas sincronizadas correctamente');
    app.listen(3000, () => {
      console.log('🟢 Servidor backend en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Error al sincronizar tablas:', err);
  });
