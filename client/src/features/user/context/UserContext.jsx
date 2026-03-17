import {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserController } from './UserController';

export const UserContext = createContext(null);

/**
 * @typedef {Object} UserProviderReturn
 * @property {Object|null} user - current user object
 * @property {boolean} isLoggedIn - whether a user is currently logged in (!!user)
 * @property {boolean} sessionLoaded - whether the initial session check has completed
 * @property {boolean} isPending - whether a user action is currently in progress
 * @property {{
 *   login: function(Object): Promise<Object>,
 *   logout: function(): Promise<void>
 * }} userAuth - authentication methods
 * @property {{
 *   register: function(Object): Promise<Object>,
 *   updateUser: function(Object): Promise<Object>,
 * }} userAdmin - user management methods
 */

/**
 * @returns {UserProviderReturn}
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);
  const lastUserRef = useRef(null);
  const navigate = useNavigate();
  // create controller (useMemo prevents loops when controller functions used as dependencies)
  const { checkSession, userAuth, userAdmin } = useMemo(() => {
    const concurrencyControls = {
      lockRef: isBusyRef,
      setPending: setIsPending,
    };

    return createUserController({
      setUser,
      setSessionLoaded,
      navigate,
      concurrencyControls,
      userRef: lastUserRef,
    });
  }, [navigate]);

  // load session on mount
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // update lastUserRef on user change
  useEffect(() => {
    lastUserRef.current = user;
  }, [user]);

  const ctx = useMemo(() => {
    return {
      user,
      isLoggedIn: !!user,
      sessionLoaded,
      userAuth,
      userAdmin,
      isPending,
    };
  }, [user, isPending, userAuth, userAdmin, sessionLoaded]);

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
