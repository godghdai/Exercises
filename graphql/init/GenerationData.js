const { schoolModel, studentModel, classesModel, teacherModel, Op } = require('../db');
const Mock = require('../mock');
const R = require('ramda');

var cnameMap = num => (num.toString().length < 2 ? "0" + num : num) + '班';
//班级名称列表
var classNames = R.map(R.join(' '), R.xprod(
    ["高一", "高二", "高三"],
    R.map(cnameMap, R.range(1, 4))
));

(async function() {

    var schools = R.project(['name', 'id'], await schoolModel.findAll({ offset: 0, limit: 10 }));
    for (var i = 0; i < schools.length; i++) {

        var classCount = await classesModel.count({
            where: {
                'schoolId': {
                    [Op.eq]: schools[i].id
                }
            }
        });
        if (classCount == 0) {
            await classesModel.bulkCreate(classNames.map((className) => ({
                name: className,
                schoolId: schools[i].id
            })));
        }

        var classes = await classesModel.findAll({
            where: {
                'schoolId': {
                    [Op.eq]: schools[i].id
                }
            },
            offset: 0,
            limit: 5
        });
        classes = R.project(['name', 'id'], classes);

        for (var c_i = 0; c_i < classes.length; c_i++) {
            var studentData = Mock.mock({
                'list|5': [{
                    birthday: "@date('yyyy-MM-dd')",
                    email: "@email",
                    name: "@YName(0)",
                    nation: "@YMinorities",
                    card: "@YCard",
                    address: function() {
                        return Mock.Random.YAddress() + Mock.Random.YRoad();
                    },
                    email: "@YEmail",
                    tel: "@YTel",
                    'area': function() {
                        return this.card.substr(0, 6);
                    }
                }]
            }).list;

            await studentModel.bulkCreate(studentData.map((student) => {
                student.schoolId = schools[i].id;
                student.classId = classes[c_i].id;
                return student;
            }));

            var TeacherData = Mock.mock({
                'list|5': [{
                    birthday: "@date('yyyy-MM-dd')",
                    email: "@email",
                    name: "@YName(0)",
                    nation: "@YMinorities",
                    card: "@YCard",
                    address: function() {
                        return Mock.Random.YAddress() + Mock.Random.YRoad();
                    },
                    email: "@YEmail",
                    tel: "@YTel"
                }]
            }).list;

            await teacherModel.bulkCreate(TeacherData);

           // sequelize.query('SELECT * FROM projects WHERE status IN(:status) ', { replacements: { status: ['active', 'inactive'] }, type: sequelize.QueryTypes.SELECT }).then(projects => {
           //     console.log(projects)
           // })
        }

    }



})().then(a => a).catch(ex => console.log(ex))