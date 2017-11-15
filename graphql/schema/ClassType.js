const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const StudentType=require('./StudentType');

module.exports = new GraphQLObjectType({
    name: 'ClassType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: '班级ID',
        },
        name: {
            type: GraphQLString,
            description: '班级名称',
        },
        students: {
            type: new GraphQLList(StudentType),
            description: '班级学生列表',
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
                        classId: {
                            [Op.eq]: root.id
                        }
                    },
                    offset: offset,
                    limit: limit
                });
                return R.project(['id', 'name', 'card', 'address'], result);
            }
        }
    })
});
