import { AuthViewMode as AuthMode } from './enums';

const PATHS = Object.freeze({
  FRONT: {
    EXPORT: '/products/admin',
    LANDING: `/collection`,
    LOGIN: '/',
    MAINTENANCE: `/fee-guide/update`,
    NEW_GUIDE: '/fee-guide/new',
    USER_ACCESS: `/user/access`,
  },
  BACK: {
    GUIDES: '/api/cuides',
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
