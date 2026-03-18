import { useNavigate } from 'react-router-dom';
import SectionFrame from '../../../../components/ui/frames/SectionFrame';
import PATHS from '../../../../config/paths';
import PROVINCES from '../../../refinery/config/provinces';
import SPECIALTIES from '../../../refinery/config/specialties';

export default function PageContent({ guide, isLoading }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className='loading-state'>
        <p>Loading fee guide data...</p>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className='error-state'>
        <h2>Guide Not Found</h2>
        <button
          onClick={() => navigate(PATHS.FRONT.DASHBOARD)}
          className='button button--primary'>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const provinceName =
    PROVINCES.find((p) => p.code === guide.province_code)?.name
    || guide.province_code;
  const specialtyName =
    SPECIALTIES.find((s) => s.code === guide.specialty_code)?.name
    || guide.specialty_code;

  return (
    <SectionFrame
      className='guide-detail-view'
      heading={`${guide.year_effective} ${provinceName} - ${specialtyName}`}
      isBase={true}>
      <div className='table-container mt-4'>
        <table className='data-table'>
          <thead>
            <tr>
              <th>Code</th>
              <th>Procedure Name</th>
              <th>Category</th>
              <th>Min Fee</th>
              <th>Max Fee</th>
              <th>Strategy</th>
              <th>Flags</th>
            </tr>
          </thead>
          <tbody>
            {guide.fee_guide_items
              ?.filter((item) => item.schedule_item.code[4] !== '0')
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.schedule_item.code}</td>
                  <td title={item.schedule_item.name}>
                    {item.schedule_item.name.length > 20
                      ? `${item.schedule_item.name.slice(0, 20)}...`
                      : item.schedule_item.name}
                  </td>
                  <td>
                    {item.parent_category || item.schedule_item.parent_category}
                  </td>
                  <td>
                    {item.fee_min_cents > 0
                      ? `$${(item.fee_min_cents / 100).toFixed(2)}`
                      : '-'}
                  </td>
                  <td>
                    {item.fee_max_cents > 0
                      ? `$${(item.fee_max_cents / 100).toFixed(2)}`
                      : '-'}
                  </td>
                  <td>{item.fee_strategy}</td>
                  <td>
                    {item.has_L_flag ? '+L ' : ''}
                    {item.has_E_flag ? '+E ' : ''}
                    {item.has_PS_flag ? '+PS' : ''}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </SectionFrame>
  );
}
