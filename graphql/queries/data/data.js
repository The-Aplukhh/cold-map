import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import dataType from '../../types/data';
import dataModel from '../../../models/dailyData';

export default {
  type: new GraphQLList(dataType),
  args: {
  },
  resolve (root, params, options) {
    
    return dataModel
      .find({
      })
      .exec();
  }
};
