import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import studentInputType from '../../types/student-input';
import studentType from '../../types/student';
import studentModel from '../../../models/student';

export default {
 type: studentType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(studentInputType)
    }
  },
  resolve (root, params) {
    const studentModel = new studentModel();
    const newStudent = studentModel.save();

    if (!newStudent) {
      throw new Error('Error adding new student');
    }
    return newStudent;
  }
};
