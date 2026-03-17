import { NavLink } from 'react-router-dom';

export default function NavLayout({ linkConfig }) {
  return (
    <ul className='list--nav-links'>
      {linkConfig.map((link) => (
        <li key={link.path}>
          <NavLink to={link.path}>{link.label}</NavLink>
        </li>
      ))}
    </ul>
  );
}
