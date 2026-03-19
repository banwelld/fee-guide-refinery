export default function FeeGuideItemsTable({ items, search }) {
  if (!items) return null;

  const centsToDollars = (centsInteger) =>
    `$${(centsInteger / 100).toFixed(2)}`;

  return (
    <table className='table__container table--fee-guide'>
      <thead>
        <tr>
          <th className='table__column table__column--code'>Code</th>
          <th className='table__column table__column--name'>Procedure Name</th>
          <th className='table__column table__column--fee'>Min Fee</th>
          <th className='table__column table__column--fee'>Max Fee</th>
          <th className='table__column table__column--flags'>Flags</th>
        </tr>
      </thead>
      <tbody>
        {items
          .filter((item) => !search || item.scheduleItem.code.includes(search))
          .map((item) => (
            <tr key={item.id}>
              <td className='table__column table__column--code'>
                {item.scheduleItem.code}
              </td>
              <td
                className='table__column table__column--name'
                title={item.scheduleItem.name}>
                {item.scheduleItem.name.length > 20
                  ? `${item.scheduleItem.name.slice(0, 20)}...`
                  : item.scheduleItem.name}
              </td>
              <td className='table__column table__column--fee'>
                {item.feeMinCents > 0 ? centsToDollars(item.feeMinCents) : '-'}
              </td>
              <td className='table__column table__column--fee'>
                {item.feeMaxCents > 0 ? centsToDollars(item.feeMaxCents) : '-'}
              </td>
              <td className='table__column table__column--flags'>
                {item.hasLFlag ? '+L ' : ''}
                {item.hasEFlag ? '+E ' : ''}
                {item.hasPSFlag ? '+PS' : ''}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
