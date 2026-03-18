import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../config/constants';

export default function ProvinceOptions({ selections }) {
  // the literal option represents the non-selectable default option
  return (
    <>
      <option value={DEFAULT} disabled>
        select one...
      </option>
      {selections.map(({ code, name }) => (
        <option key={code} value={code}>
          {`${code} - ${name}`}
        </option>
      ))}
    </>
  );
}
