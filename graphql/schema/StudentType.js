const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'StudentType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: '学生ID',
        },
        name: {
            type: GraphQLString,
            description: '姓名',
        },
        card: {
            type: GraphQLString,
            description: '身份证号',
        },
        address: {
            type: GraphQLString,
            description: '住址',
        },
        tel: {
            type: GraphQLString,
            description: '电话',
        },
    })
});