import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'DataInput',
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
