import { Link } from 'react-router-dom';
import logo from '.assets/fee-guide-refinery-logo-128X128.webp';
import PATHS from '../../config/paths';
import { Headings } from '../../config/constants';

export default function Banner() {
  return (
    <div className='component--banner, component__container--banner'>
      <Link
        to={PATHS.FRONT.LOGIN}
        aria-label={`${Headings.FG_REFINERY} homepage`}>
        <div className='componnt__container--banner-image'>
          <img src={logo} alt={Headings.FG_REFINERY_LOGO} />
        </div>
        <div className='component__container--company-name'>
          <h1>{Headings.FG_REFINERY}</h1>
        </div>
      </Link>
    </div>
  );
}
