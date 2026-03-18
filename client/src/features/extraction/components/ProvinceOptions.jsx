import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../config/enums';

const PROVINCES = [
  { name: 'Alberta', code: 'AB' },
  { name: 'British Columbia', code: 'BC' },
  { name: 'Manitoba', code: 'MB' },
  { name: 'New Brunswick', code: 'NB' },
  { name: 'Newfoundland and Labrador', code: 'NL' },
  { name: 'Northwest Territories', code: 'NT' },
  { name: 'Nova Scotia', code: 'NS' },
  { name: 'Nunavut', code: 'NU' },
  { name: 'Ontario', code: 'ON' },
  { name: 'Prince Edward Island', code: 'PE' },
  { name: 'Quebec', code: 'QC' },
  { name: 'Saskatchewan', code: 'SK' },
  { name: 'Yukon', code: 'YT' },
];

export default function ProvinceOptions() {
  return (
    <>
      <option value={DEFAULT} disabled>
        select a province...
      </option>
      {PROVINCES.map(({ code, name }) => (
        <option key={code} value={code}>
          {`${code} - ${name}`}
        </option>
      ))}
    </>
  );
}
