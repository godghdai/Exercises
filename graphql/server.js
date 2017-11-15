const express = require('express');
const graphqlHTTP = require('express-graphql');
const R = require('ramda');
const opn = require('opn');

const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

const { schoolModel, classesModel, studentModel, Op } = require('./db');
const DataLoader = require('dataloader');

const StudentType = new GraphQLObjectType({
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

const ClassType = new GraphQLObjectType({
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

const queryType = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
        schoolList: {
            type: new GraphQLList(SchoolType),
            description: '学校列表',
            args: {
                name: {
                    type: GraphQLString,
                    description: '学校名称',
                },
                page: {
                    type: GraphQLInt,
                    description: '页',
                },
                limit: {
                    type: GraphQLInt,
                    description: '每页条目数',
                }
            },
            async resolve(root, { name, page, limit }) {
                name = name || "";
                limit = limit || 5;
                offset = (page || 0) * limit;
                var result = await schoolModel.findAll({
                    attributes: ['id', 'name'],
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    offset: offset,
                    limit: limit
                });
                return R.project(['id', 'name'], result);
            },
        },
        studentList: {
            type: new GraphQLList(SchoolType),
            description: '学生列表',
            args: {
                name: {
                    type: GraphQLString,
                    description: '学校名称',
                },
                page: {
                    type: GraphQLInt,
                    description: '页',
                },
                limit: {
                    type: GraphQLInt,
                    description: '每页条目数',
                }
            },
            async resolve(root, { name, page, limit }) {
                name = name || "";
                limit = limit || 5;
                offset = (page || 0) * limit;
                var result = await studentModel.findAll({
                    attributes: ['id', 'name', 'card', 'address'],
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
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







var ClassInputObject = new GraphQLInputObjectType({
    name: 'ClassInput',
    fields: {
        schoolId: {
            type: new GraphQLNonNull(GraphQLInt),
            description: '学校ID'
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: '班级名称'
        }
    }
});


const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root Mutation type',
    fields: {
        createClass: {
            type: ClassType,
            description: '创建班级',
            args: {
                ClassInput: { 
                    type: ClassInputObject
               },
            },
            resolve: (root, {ClassInput}) => {
                return classesModel.create(ClassInput);
               /*
               return new Promise(function(resolve, reject) {
                    setTimeout(() => {
                        resolve({
                            id: "1",
                            name: "testschool:css" 
                        })
                    }, 100)
                })*/
               
               // return createVideo(args)
            }
        }
    }
});






const schema2 = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
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
    //opn('http://localhost:4000/graphql', {app: ['chrome', '--incognito']});
});

/*
{
  schoolList(limit: 2, page: 1) {
    id
    name
    students(limit: 2) {
      id
      name
      address
    }
    classes(limit: 1) {
      id
      name
      students(limit: 2) {
        id
        name
      }
    }
  }
  studentList(limit: 2,name:"李") {
    id
    name
  }
}


mutation class {
  createClass(ClassInput:{
    schoolId:12,
    name:"tests"
  }){
    id
    name
  }
}


*/