const PATHS = Object.freeze({
  FRONT: {
    DASHBOARD: '/dashboard',
    EXPORT: '/fee-guide/export',
    HOME: '/',
    MAINTENANCE: `/fee-guide/update`,
    USER_ACCESS: `/user/access`,
    CONTACT_US: '/#contact',
    REFINERY: '/fee-guide/refine',
  },
  BACK: {
    GUIDES: '/api/fee-guides',
    GUIDE_ID: (id) => `/api/fee-guides/${id}`,
    GUIDE_ITEMS: '/api/fee-guide-items',
    GUIDE_ITEM_ID: (id) => `/api/fee-guide-items/${id}`,
    SCHEDULE_ITEMS: '/api/schedule-items',
    SCHEDULE_ITEM_ID: (id) => `/api/schedule-items/${id}`,
    SESSION: '/api/session',
    USERS: '/api/users',
    USER_ID: (id) => `/api/users/${id}`,
  },
});

export default PATHS;
