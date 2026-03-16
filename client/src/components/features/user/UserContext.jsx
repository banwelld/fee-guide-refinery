import { createContext, useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserController } from './UserController';

export const UserContext = createContext(null);

/**
 * @typedef {Object} UserProviderReturn
 * @property {Object} user - current user object
 * @property {boolean} isLoggedIn - whether the user is currently logged in
 * @property {boolean} isPending - whether a user action is currently in progress
 * @property {{
 *   login: function(Object): Promise<void>,
 *   register: function(Object): Promise<void>,
 *   logout: function(): Promise<void>
 * }} userAuth - authentication methods
 * @property {{
 *   updateUser: function(Object): Promise<void>,
 *   deleteUser: function(): Promise<void>,
 * }} userActions - user management methods
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
  const { checkSession, userAuth, userActions } = useMemo(() => {
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
      isLoggedIn: sessionLoaded,
      userAuth,
      userActions,
      isPending,
    };
  }, [user, isPending, userAuth, userActions, isLoggedIn]);

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
