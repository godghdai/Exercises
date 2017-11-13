const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("teacher", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        name: Sequelize.STRING(10),
        nation: Sequelize.STRING(10),
        card:Sequelize.STRING(20),
        address:Sequelize.STRING(50),
        email:Sequelize.STRING(20),
        tel:Sequelize.STRING(15),
        flag: {
         type:Sequelize.INTEGER,
         allowNull: false, 
         defaultValue: 0
       }
    })
}