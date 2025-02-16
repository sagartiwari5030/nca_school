import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { login, logOut, register, fetchProfile } from 'src/api/auth';

import { AuthContext } from './auth-context';
import { isValidToken, setLocalStorage } from './utils';

const initialState = {
  user: null,
  loading: true,
  toggling: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        toggling: false,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'REGISTER':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const STORAGE_KEY = 'accessToken';
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate(); // Using useNavigate instead of useRouter

  const initialize = useCallback(async () => {
    try {

      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {

        setLocalStorage(accessToken);

        const response = await fetchProfile(accessToken);
        const user = response.data;
        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: { user: null },
        });
      }
    } catch (error) {
      console.error('Error during initialization:', error);
      dispatch({
        type: 'INITIAL',
        payload: { user: null },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const loginAsDoctor = useCallback(async (data) => {
    try {
      const response = await login(data);
      const { data: user, token: accessToken, message } = response.data;

      setLocalStorage(accessToken);
      initialize();
      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
      return undefined;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [initialize]);

  // REGISTER
  const registerAsDoctor = useCallback(async (data) => {
    try {
      const response = await register(data);

      if (response?.success) {
        const { data: user, token: accessToken, message } = response.data;

        setLocalStorage(accessToken);
        initialize();

        dispatch({
          type: 'REGISTER',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });

        return { success: true, message };
      }

      // Handle failure case with fallback
      return { success: false, message: response?.message || 'Registration failed' };

    } catch (error) {
      console.error('Registration error:', error?.message || error);
      throw new Error('An error occurred during registration. Please try again.');
    }
  }, [initialize]);

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        const response = await logOut(accessToken);
        if (response.success) {
          setLocalStorage(null);
          dispatch({ type: 'LOGOUT'});
          navigate('/login'); // Use navigate to redirect after logout
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
      setLocalStorage(null);
      dispatch({ type: 'LOGOUT'});
    }
  }, [navigate]);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      toggling: state.toggling,
      dispatch,
      loginAsDoctor,
      registerAsDoctor,
      logout,
    }),
    [loginAsDoctor, logout, registerAsDoctor, state.user, state.toggling, dispatch, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
