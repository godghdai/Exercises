const express = require('express');
const graphqlHTTP = require('express-graphql');
const R = require('ramda');
const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const { schoolModel, classesModel, studentModel, Op } = require('./db');

const StudentType = new GraphQLObjectType({
    name: 'StudentType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The id of the Student.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the Student.',
        },
        card: {
            type: GraphQLString,
            description: 'The card of the Student.',
        },
        address: {
            type: GraphQLString,
            description: 'The address of the Student.',
        },
        tel: {
            type: GraphQLString,
            description: 'The tel of the Student.',
        },
    })
});

const ClassType = new GraphQLObjectType({
    name: 'ClassType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The id of the School.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the human.',
        },
        students: {
            type: new GraphQLList(StudentType),
            args: {
                schoolId: {
                    type: GraphQLInt,
                }
            },
            async resolve(root, { schoolId }) {
                var result = await studentModel.findAll({
                    attributes: ['id', 'name', 'card', 'address'],
                    where: {
                        classId: {
                            [Op.eq]: root.id
                        }
                    },
                    offset: 0,
                    limit: 5
                });
                return R.project(['id', 'name', 'card', 'address'], result);
            }
        }
    })
});



const SchoolType = new GraphQLObjectType({
    name: 'SchoolType',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The id of the School.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the human.',
        },
        students: {
            type: new GraphQLList(StudentType),
            args: {
                schoolId: {
                    type: GraphQLInt,
                }
            },
            async resolve(root, { schoolId }) {
                var result = await studentModel.findAll({
                    attributes: ['id', 'name', 'card', 'address'],
                    where: {
                        schoolId: {
                            [Op.eq]: root.id
                        }
                    },
                    offset: 0,
                    limit: 5
                });
                return R.project(['id', 'name', 'card', 'address'], result);
            }
        },
        classes: {
            type: new GraphQLList(ClassType),
            args: {
                schoolId: {
                    type: GraphQLInt,
                }
            },
            async resolve(root, { schoolId }) {
                var result = await classesModel.findAll({
                    attributes: ['id', 'name'],
                    where: {
                        schoolId: {
                            [Op.eq]: root.id
                        }
                    },
                    offset: 0,
                    limit: 5
                });
                return R.project(['id', 'name'], result);
            }
        }
    })
});

const queryType = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
        schoolList: {
            type: new GraphQLList(SchoolType),
            args: {
                name: {
                    type: GraphQLString,
                }
            },
            async resolve(root, { name }) {

                var result = await schoolModel.findAll({
                    attributes: ['id', 'name'],
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    offset: 0,
                    limit: 5
                });
                return R.project(['id', 'name'], result);
            },
        },
        studentList: {
            type: new GraphQLList(SchoolType),
            args: {
                name: {
                    type: GraphQLString,
                }
            },
            async resolve(root, { offset,limit }) {
                var result = await studentModel.findAll({
                    attributes: ['id', 'name', 'card', 'address'],
                    offset: 0,
                    limit: 5
                });
                return R.project(['id', 'name', 'card', 'address'], result);
            }
        }

    })
});
const schema2 = new GraphQLSchema({
    query: queryType
});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema2,
    // schema: {
    //   "schema":schema
    // },
    // rootValue: root,
    graphiql: true
}));
app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});