import { SortKey } from './sortConfig';
import { compareSortValues } from '../../../../../utils/helpers';

export const sortComparators = {
  [SortKey.DEPARTMENT]: compareSortValues({ key: 'category' }),
  [SortKey.NAME_ASC]: compareSortValues({ key: 'name' }),
  [SortKey.NAME_DESC]: compareSortValues({
    key: 'name',
    type: 'string',
    direction: 'desc',
  }),
  [SortKey.PRICE_ASC]: compareSortValues({ key: 'priceCents', type: 'number' }),
  [SortKey.PRICE_DESC]: compareSortValues({
    key: 'priceCents',
    type: 'number',
    direction: 'desc',
  }),
};
