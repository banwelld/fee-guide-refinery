import { UserRole as Role } from '../../../../config/constants';
import PATHS from '../../../../config/paths';

export const NAV_LINK_CONFIG = [
  {
    path: PATHS.FRONT.LANDING,
    label: 'Fee Guide List',
    visibleTo: [Role.MANAGER, Role.USER, Role.ADMIN],
  },
  {
    path: PATHS.FRONT.NEW_GUIDE,
    label: 'New Guide',
    visibleTo: [Role.MANAGER, Role.USER],
  },
  {
    path: PATHS.FRONT.MAINTENANCE,
    label: 'Guide Maintenance',
    visibleTo: [Role.MANAGER],
  },
  {
    path: PATHS.FRONT.ACCESS,
    label: 'Manage Access',
    visibleTo: [Role.MANAGER],
  },
  {
    path: PATHS.FRONT.EXPORT,
    label: 'Add/Update Products',
    visibleTo: [Role.MANAGER, Role.ADMIN],
  },
];
