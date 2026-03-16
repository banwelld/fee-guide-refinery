import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

/**
 * @typedef {Object} UseUserReturn
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
 * @returns {UseUserReturn}
 */
export default function useUser() {
  return useContext(UserContext);
}
