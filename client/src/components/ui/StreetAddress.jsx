import { toBemClassName } from '../../utils/helpers';

export default function StreetAddress({
  addressLine1,
  addressLine2,
  city,
  provinceCode,
  postalCode,
}) {
  const addressLine3 = `${city}, ${provinceCode}  ${postalCode}`;

  const bemBlock = 'street-address';

  const lineClassName = toBemClassName({
    bemBlock,
    bemElem: 'address-line',
  });

  return (
    <address className={toBemClassName({ bemBlock })}>
      <p className={lineClassName}>{addressLine1}</p>
      {addressLine2 && <p className={lineClassName}>{addressLine2}</p>}
      <p className={lineClassName}>{addressLine3}</p>
    </address>
  );
}
