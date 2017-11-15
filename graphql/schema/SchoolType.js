const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const StudentType=require('./StudentType');
const ClassType=require('./ClassType');

const SchoolType = new GraphQLObjectType({
    name: 'SchoolType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: '学校ID',
        },
        name: {
            type: GraphQLString,
            description: '学校名称',
        },
        students: {
            type: new GraphQLList(StudentType),
            description: '学校学生列表',
            args: {
                page: {
                    type: GraphQLInt,
                    description: '页',
                },
                limit: {
                    type: GraphQLInt,
                    description: '每页条目数',
                }
            },
            async resolve(root, { page, limit }) {
                limit = limit || 5;
                offset = (page || 0) * limit;
                var result = await studentModel.findAll({
                    attributes: ['id', 'name', 'card', 'address'],
                    where: {
                        schoolId: {
                            [Op.eq]: root.id
                        }
                    },
                    offset: offset,
                    limit: limit
                });
                return R.project(['id', 'name', 'card', 'address'], result);
            }
        },
        classes: {
            type: new GraphQLList(ClassType),
            args: {
                page: {
                    type: GraphQLInt,
                    description: '页',
                },
                limit: {
                    type: GraphQLInt,
                    description: '每页条目数',
                }
            },
            async resolve(root, { page, limit }) {
                limit = limit || 5;
                offset = (page || 0) * limit;
                var result = await classesModel.findAll({
                    attributes: ['id', 'name'],
                    where: {
                        schoolId: {
                            [Op.eq]: root.id
                        }
                    },
                    offset: offset,
                    limit: limit
                });
                return R.project(['id', 'name'], result);
            }
        }
    })
});