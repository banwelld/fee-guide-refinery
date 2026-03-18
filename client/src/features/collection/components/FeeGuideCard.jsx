import { Link } from 'react-router-dom';
import { getProvinceLogo, getProvinceName } from '../utils/logoMapping';
import PATHS from '../../../config/paths';
import { LinkLabel as LL } from '../../../config/constants';
import SPECIALTIES from '../../refinery/config/specialties';

export default function FeeGuideCard({ feeGuide }) {
  const { id, provinceCode, yearEffective, specialtyCode, updatedAt, createdAt } = feeGuide;

  const logo = getProvinceLogo(provinceCode);
  const provinceName = getProvinceName(provinceCode);
  const lastUpdated = new Date(updatedAt || createdAt).toLocaleDateString();

  const specialtyName =
    SPECIALTIES.find(
      (s) =>
        s.code === specialtyCode ||
        s.name.toLowerCase().replace(/ /g, '_') === specialtyCode
    )?.name || specialtyCode;

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
          <span className='fg-card__specialty'>{specialtyName}</span>
          <span className='fg-card__updated'>Last updated: {lastUpdated}</span>
        </div>
      </div>

      <div className='fg-card__actions'>
        <Link
          to={`${PATHS.FRONT.MAINTENANCE}/${id}`}
          className='button button--primary'>
          {LL.REFINE}
        </Link>
      </div>
    </div>
  );
}
