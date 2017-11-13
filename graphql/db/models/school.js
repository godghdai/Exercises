const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("school", {
  	id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    name: Sequelize.STRING(50),
    flag: {
         type:Sequelize.INTEGER,
         allowNull: true, 
         defaultValue: 0
     }
  })
}