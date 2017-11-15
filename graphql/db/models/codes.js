const mixin = require('mixin-deep');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('codes', {
        timestamps: false,
        tableName: 'codes',
        code: {
            unique: true,
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        lev: {
            type: DataTypes.INTEGER
        },
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        }
    });
}