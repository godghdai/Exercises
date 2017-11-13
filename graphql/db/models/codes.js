const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('codes', {
        timestamps: false,
        tableName: 'codes',
        code: {
            unique: true,
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        lev: {
            type: Sequelize.INTEGER
        },
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        }
    });
}