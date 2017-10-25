import {
  GraphQLList
} from 'graphql';

import studentType from '../../types/student';
import studentModel from '../../../models/student';

export default {
  type: new GraphQLList(studentType),
  args: {},
  resolve (root, params, options) {

    return studentModel
      .find()
      .exec();
  }
};
