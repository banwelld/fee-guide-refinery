import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../config/constants';

export default function FormOptions({ selections, isPrimitives = false }) {
  const optionsList = isPrimitives
    ? selections.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))
    : selections.map(({ code, name }) => (
        <option key={code} value={code}>
          {`${code} - ${name}`}
        </option>
      ));

  // the literal option represents the non-selectable default option
  return (
    <>
      <option value={DEFAULT} disabled>
        select one...
      </option>
      {optionsList}
    </>
  );
}
