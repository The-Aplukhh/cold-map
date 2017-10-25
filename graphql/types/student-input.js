import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'StudentInput',
  fields: {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    cohort: {type: GraphQLID}
  }
});
