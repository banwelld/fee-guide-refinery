import { UserRole as Role } from '../../config/constants';
import { NAV_LINK_CONFIG as CONFIG } from './navLinkConfig';
import NavLayout from './NavLayout';
import useUser from '../user/context/useUser';

export default function Nav() {
  const { user } = useUser();
  const role = user?.role ?? Role.PUBLIC;

  const linkConfig = CONFIG.filter(
    (link) => link.visibleTo?.includes(role) ?? false,
  );

  return (
    <nav>
      <NavLayout linkConfig={linkConfig} />
    </nav>
  );
}
