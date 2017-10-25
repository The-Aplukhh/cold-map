import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import studentInputType from '../../types/student-input';
import studentModel from '../../../models/student';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(studentInputType)
    }
  },
  async resolve (root, params, options) {
    const studentModel = new studentModel(params.data);
    const newStudent = await studentModel.save();

    if (!newStudent) {
      throw new Error('Error adding new student');
    }
    return true;
  }
};
