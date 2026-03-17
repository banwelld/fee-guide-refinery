import { AuthViewMode as AuthMode } from './enums';

const PATHS = Object.freeze({
  FRONT: {
    DASHBOARD: '/dashboard',
    EXPORT: '/products/admin',
    LOGIN: '/',
    HOME: '/',
    AUTH: '/',
    MAINTENANCE: `/fee-guide/update`,
    CREATE: '/fee-guide/create',
    USER_ACCESS: `/user/access`,
    CONTACT_US: '/contact',
  },
  BACK: {
    GUIDES: '/api/guides',
    GUIDE_ID: (id) => `/api/guides/${id}`,
    LISTINGS: '/api/listings',
    LISTING_ID: (id) => `/api/listings/${id}`,
    PROCEDURES: '/api/procedures',
    PROCEDURE_ID: (id) => `/api/procedures/${id}`,
    SESSION: '/api/session',
    USERS: '/api/users',
    USER_ID: (id) => `/api/users/${id}`,
  },
});

export default PATHS;
