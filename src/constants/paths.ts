export const Paths = {
    USERS: {
      CREATE: '/users',
      FIND_ALL: '/users',
      FIND_ALL_ACTIVE: '/users/active',
      FIND_ALL_DELETED: '/users/deleted',
      FIND_ONE: (param: number | string) => `/users/${param}`,
      UPDATE: (id: number | string) => `/users/${id}`,
      DELETE: (id: number | string) => `/users/${id}/delete`,
    },
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      SIGNUP: '/auth/signup',
    },
  };