import { NavLink } from 'react-router-dom';

import Button from '../../components/ui/Button';
import useUser from '../user/context/useUser';

export default function NavLayout({ linkConfig }) {
  const { user, userAuth } = useUser();

  return (
    <>
      <ul className='list--nav-links'>
        {linkConfig.map((link) => (
          <li key={link.label}>
            <NavLink to={link.path}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
      {user && (
        <Button
          label='Logout'
          className='button--session-state'
          onClick={userAuth.logout}
        />
      )}
    </>
  );
}
