export const SortKey = Object.freeze({
  DEPARTMENT: 'department',
  NAME_ASC: 'nameAsc',
  NAME_DESC: 'nameDesc',
  PRICE_ASC: 'priceAsc',
  PRICE_DESC: 'priceDesc',
});

export const sortConfig = [
  {
    value: SortKey.DEPARTMENT,
    label: 'Department',
  },
  {
    value: SortKey.NAME_ASC,
    label: 'Name (A → Z)',
  },
  {
    value: SortKey.NAME_DESC,
    label: 'Name (Z → A)',
  },
  {
    value: SortKey.PRICE_ASC,
    label: 'Price ($ → $$$)',
  },
  {
    value: SortKey.PRICE_DESC,
    label: 'Price ($$$ → $)',
  },
];
