import { Link } from 'react-router-dom';
import logo from '.assets/fee-guide-refinery-logo-128X128.webp';
import PATHS from '../../config/paths';
import { Headings } from '../../config/constants';

export default function HeaderBanner({}) {
  return (
    <div className='component--banner, component__container--banner'>
      <Link to={PATHS.FRONT.HOME} aria-label='Grocery2Go homepage'>
        <div className='componnt__container--banner-image'>
          <img src={logo} alt={Headings.FEE_GUIDE_REFINERY} />
        </div>
      </Link>
    </div>
  );
}
