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
app.use('/api/categories', require('./routes/categoriy.routes')); //es el mismo stock
app.use('/api/movements', require('./routes/movements.routes')); //Registros
app.use('/api/stock', require('./routes/stock.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api/salidas', require('./routes/salidas.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/users', require('./routes/users.routes')); // Para todas las rutas /users

// En app.js - Ruta de diagnóstico
app.get('/api/debug/models', (req, res) => {
  console.log('🔍 Debug de modelos disponibles');
  
  const modelos = Object.keys(db).filter(key => 
    !['Sequelize', 'sequelize'].includes(key)
  );
  
  res.json({
    status: 'OK',
    modelos_disponibles: modelos,
    conexion_db: db.sequelize.config
  });
});

app.get('/api/debug/movements-table', async (req, res) => {
  try {
    // Verificar si la tabla existe
    const [results] = await db.sequelize.query("SHOW TABLES LIKE 'movements'");
    const tableExists = results.length > 0;
    
    if (tableExists) {
      const [columns] = await db.sequelize.query("DESCRIBE movements");
      res.json({
        tabla_existe: true,
        columnas: columns
      });
    } else {
      res.json({
        tabla_existe: false,
        mensaje: 'La tabla movements no existe'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
});


// 🔄 Sincronización y servidor
db.sequelize.authenticate()
  .then(() => {
    console.log('🔄 Tablas sincronizadas correctamente');
    app.listen(3000, () => {
      console.log('🟢 Servidor backend en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Error al sincronizar tablas:', err);
  });
