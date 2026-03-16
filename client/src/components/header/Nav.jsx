import { NAV_LINK_CONFIG as CONFIG } from './header-nav/navLinkConfig';
import useUser from '../../user/hooks/useUser';
import NavLayout from './header-nav/NavLayout';

export default function NavBar() {
  const { user } = useUser();
  const role = user?.role ?? 'unknown';

  if (role === 'unknown') return <p>Loading...</p>;

  const linkConfig = CONFIG.filter(
    (link) => link.visibleTo?.includes(role) ?? false,
  );

  return (
    <nav>
      <NavLayout linkConfig={linkConfig} />
    </nav>
  );
}
