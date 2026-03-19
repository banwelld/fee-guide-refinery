import * as userSerializer from '../features/user/utils/userSerializer';
import * as feeGuideSerializer from '../features/collection/utils/feeGuideSerializer';
import * as feeGuideItemSerializer from '../features/collection/utils/feeGuideItemSerializer';
import * as scheduleItemSerializer from '../features/collection/utils/scheduleItemSerializer';

// map type names to serializer modules
const serializers = {
  user: userSerializer,
  feeGuide: feeGuideSerializer,
  feeGuideItem: feeGuideItemSerializer,
  scheduleItem: scheduleItemSerializer,
};

export const serialize = (data, type, direction = 'toClient') => {
  if (!data) return data;

  const serializer = serializers[type];
  if (!serializer) {
    console.warn(`No serializer found for '${type}'`);
    return data;
  }

  const func = serializer[direction];
  if (!func) {
    console.warn(`No serializer found for '${direction}' in '${type}'`);
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => func(item));
  }

  return func(data);
};

export const toClient = (data, type) => serialize(data, type, 'toClient');
export const toServer = (data, type) => serialize(data, type, 'toServer');
