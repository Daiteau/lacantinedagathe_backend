export const Paths = {
    USERS: {
      CREATE: '',
      FIND_ALL: '',
      FIND_ALL_ACTIVE: '/active',
      FIND_ALL_DELETED: '/deleted',
      FIND_ONE: (param: number | string) => `/${param}`,
      UPDATE: (id: number | string) => `/${id}`,
      DELETE: (id: number | string) => `/delete/${id}`,
    },
    AUTH: {
      LOGIN: '/login',
      LOGOUT: '/logout',
      SIGNUP: '/signup',
    },
  };