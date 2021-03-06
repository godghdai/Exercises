const mixin = require('mixin-deep');
const hooks = require('./hooks');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("teacher", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: DataTypes.STRING(10),
        nation: DataTypes.STRING(10),
        card:DataTypes.STRING(20),
        address:DataTypes.STRING(50),
        email:DataTypes.STRING(20),
        tel:DataTypes.STRING(15),
        flag: {
         type:DataTypes.INTEGER,
         allowNull: false, 
         defaultValue: 0
       }
    },mixin({},hooks))
}