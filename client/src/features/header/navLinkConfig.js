import { UserRole as Role } from '../../config/constants';
import PATHS from '../../config/paths';

export const NAV_LINK_CONFIG = [
  {
    path: PATHS.FRONT.DASHBOARD,
    label: 'Dashboard',
    visibleTo: [Role.MANAGER, Role.USER, Role.ADMIN],
  },
  {
    path: PATHS.FRONT.MAINTENANCE,
    label: 'Guide Maintenance',
    visibleTo: [Role.MANAGER],
  },
  {
    path: PATHS.FRONT.USER_ACCESS,
    label: 'Manage Access',
    visibleTo: [Role.MANAGER],
  },
  {
    path: PATHS.FRONT.EXPORT,
    label: 'Export Data',
    visibleTo: [Role.MANAGER, Role.ADMIN],
  },
  {
    path: PATHS.FRONT.CONTACT_US,
    label: 'Contact Info',
    visibleTo: [Role.PUBLIC],
  },
];
