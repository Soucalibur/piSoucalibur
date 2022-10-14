const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Activity', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dificult:{
        type: DataTypes.INTEGER,
        validate:{
            min:1,
            max:5
        }
      },
      duration:{
        type: DataTypes.STRING,
      },
      season:{
        type: DataTypes.STRING
      }
      
     
    },
    {
      timestamps: false,
    }
    
    );
  };

//   ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)