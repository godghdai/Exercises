const Sequelize = require('sequelize');
const config = require("../config");
const Op = Sequelize.Op;
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: config.DB_PATH,
    operatorsAliases: Op
});

const classes = sequelize.import(config.DB_MODELS_PATH + "/classes");
const school = sequelize.import(config.DB_MODELS_PATH + "/school");
const student = sequelize.import(config.DB_MODELS_PATH + "/student");
const teacher = sequelize.import(config.DB_MODELS_PATH + "/teacher");

classes.belongsTo(school, {
    foreignKey: 'schoolId',
    targetKey: 'id'
});

student.belongsTo(classes);
student.belongsTo(school);

const teacher_school = sequelize.define('teacher_school', {
    flag: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})
teacher.belongsToMany(school, {
    through: 'teacher_school'
})
school.belongsToMany(teacher, {
    through: 'teacher_school',
    foreignKey: 'schoolId',
    otherKey: 'teacherId'
})

function initDataBase() {
    teacher_school.sync({
        force: true
    })
    classes.sync({
        force: true
    })
    //school.sync({ force: true })
    student.sync({
        force: true
    })
    teacher.sync({
        force: true
    })
}
module.exports = {
    initDataBase: initDataBase,
    sequelize: sequelize,
    Op:Sequelize.Op,
    schoolModel: school,
    studentModel: student,
    classesModel: classes,
    teacherModel: teacher
}