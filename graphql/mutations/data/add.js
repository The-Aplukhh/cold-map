import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import dataInputType from '../../types/data-input';
import dataType from '../../types/data';
import dataModel from '../../../models/dailyData';

export default {
  type: dataType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(dataInputType)
    }
  },
  async resolve (root, params, options) {
    const dataModel = new dataModel(params.data);
    const newData = await dataModel.save();

    if (!newData) {
      throw new Error('Error adding new data');
    }
    return newData;
  }
};
