import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Data',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    studentId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    pairData: {
      type: GraphQLString
    },
    emotionalHealth: {
      type: GraphQLString
    },
    attendance: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    }
  }
});
