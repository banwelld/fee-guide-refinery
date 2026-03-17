import { Link } from 'react-router-dom';
import { getProvinceLogo, getProvinceName } from '../utils/logoMapping';
import PATHS from '../../../config/paths';
import { LinkLabel as LL } from '../../../config/constants';

export default function FeeGuideCard({ feeGuide }) {
  const { id, provinceCode, yearEffective, specialtyCode, updatedAt } =
    feeGuide;

  const logo = getProvinceLogo(provinceCode);
  const provinceName = getProvinceName(provinceCode);
  const lastUpdated = new Date(updatedAt).toLocaleDateString();

  return (
    <div className='fg-card'>
      <div className='fg-card__logo-container'>
        <img
          src={logo}
          alt={`${provinceName} Dental Association logo`}
          className='fg-card__logo'
        />
      </div>

      <div className='fg-card__content'>
        <div className='fg-card__header'>
          <span className='fg-card__province'>{provinceName}</span>
          <h3 className='fg-card__title'>{yearEffective} Dental Fee Guide</h3>
        </div>
        <div className='fg-card__meta'>
          <span className='fg-card__specialty'>{specialtyCode}</span>
          <span className='fg-card__updated'>Last updated: {lastUpdated}</span>
        </div>
      </div>

      <div className='fg-card__actions'>
        <Link
          to={`${PATHS.FRONT.MAINTENANCE}/${id}`}
          className='btn btn--primary'>
          {LL.REFINE}
        </Link>
      </div>
    </div>
  );
}
