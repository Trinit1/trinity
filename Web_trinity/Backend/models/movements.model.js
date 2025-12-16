// models/movements.model.js
module.exports = (sequelize, DataTypes) => {
  const Movements = sequelize.define('Movements', {
    // Campo para la relación (referencia al producto real)
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Puede ser null si es solo texto
      references: {
        model: 'products', // Tabla products
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    
    // Campo texto para nombre del producto (para cuando no haya relación)
    producto_nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    tipo_movimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['entrada', 'salida', 'devolucion']]
      }
    },
    
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    
    nota: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    
    responsable: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  }, {
    tableName: 'movements',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Movements;
};