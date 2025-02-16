import { paths } from 'src/routes/paths';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
export const PATH_AFTER_LOGOUT = paths.auth.jwt.login;

const environments = {
  PROD: {
    HOST_API: import.meta.env.VITE_PROD_HOST_API,
    ASSETS_API: import.meta.env.VITE_PROD_ASSETS_API,
    MAPBOX_API: import.meta.env.VITE_PROD_MAPBOX_API,
  },
  DEV: {
    HOST_API: import.meta.env.VITE_DEV_HOST_API,
    ASSETS_API: import.meta.env.VITE_DEV_ASSETS_API,
    MAPBOX_API: import.meta.env.VITE_DEV_MAPBOX_API,
  },
  TEST: {
    HOST_API: import.meta.env.VITE_TEST_HOST_API,
    ASSETS_API: import.meta.env.VITE_TEST_ASSETS_API,
    MAPBOX_API: import.meta.env.VITE_TEST_MAPBOX_API,
  },
  LOCAL: {
    HOST_API: import.meta.env.VITE_LOCAL_HOST_API,
    ASSETS_API: import.meta.env.VITE_TEST_ASSETS_API,
    MAPBOX_API: import.meta.env.VITE_TEST_MAPBOX_API,
  },
};

const VITE_NODE_ENV = import.meta.env.VITE_NODE_ENV || 'LOCAL';

const {
  HOST_API,
  ASSETS_API,
  MAPBOX_API
} = environments[VITE_NODE_ENV];

export {
  HOST_API,
  ASSETS_API,
  MAPBOX_API
};
