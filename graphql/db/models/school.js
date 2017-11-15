const mixin = require('mixin-deep');
const hooks = require('./hooks');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("school", {
  	id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: DataTypes.STRING(50),
    flag: {
         type:DataTypes.INTEGER,
         allowNull: true, 
         defaultValue: 0
     }
  },mixin({},hooks))
}