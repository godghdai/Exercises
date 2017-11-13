const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("classes", {
  	id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    name: DataTypes.STRING(50),
    flag: {
         type:Sequelize.INTEGER,
         allowNull: false, 
         defaultValue: 0
    }
  })
}