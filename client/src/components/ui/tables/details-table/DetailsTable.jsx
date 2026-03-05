import { toBemClassName } from '../../../../utils/helpers';
import BodyFrame from '../frames/BodyFrame';
import './DetailsTable.css';

function DetailsTableRow({ label, value }) {
  return (
    <tr>
      <th scope='row'>{label} :</th>
      <td>{value}</td>
    </tr>
  );
}

export default function DetailsTable({ data, dataType }) {
  const bemRoot = {
    bemBlock: 'table',
    bemMod: 'details',
    bemMod2: `${dataType}-details`,
    showMod2: !!dataType,
  };

  return (
    <table className={toBemClassName(bemRoot)}>
      <BodyFrame bemRoot={bemRoot}>
        {Object.entries(data).map(([label, value]) => (
          <DetailsTableRow key={label} label={label} value={value} />
        ))}
      </BodyFrame>
    </table>
  );
}
