import { Navigate } from "react-router-dom";

import toast from "react-hot-toast";

import useUser from "../features/user/context/useUser";

import ErrorPage from "../pages/ErrorPage";

import Feedback from "../config/feedback";
import { UserRole } from "../config/constants";
import PATHS from "../config/paths";

const { Toasts } = Feedback;

/**
 * returns a 404 (ErrorPage) if not an admin
 */
export function AdminRoute({ children }) {
  const { user, sessionLoaded } = useUser();

  if (!sessionLoaded) return null;

  const isAdmin = user?.role in (UserRole.ADMIN, UserRole.MANAGER);
  return isAdmin ? children : <ErrorPage />;
}

/**
 * redirects logged-in users away from Auth pages
 */
export function PublicRoute({ children }) {
  const { isLoggedIn, sessionLoaded } = useUser();

  if (!sessionLoaded) return null;

  if (isLoggedIn) {
    return <Navigate to={PATHS.FRONT.DASHBOARD} replace />;
  }
  return children;
}

/**
 * general protection for member-only pages
 */
export function ProtectedRoute({ isCustomersOnly, children }) {
  const { user, isLoggedIn, sessionLoaded } = useUser();

  if (!sessionLoaded) return null;

  const isAdmissible = isCustomersOnly
    ? isLoggedIn && (user?.role === UserRole.USER || user?.role === UserRole.MANAGER)
    : isLoggedIn;

  if (isAdmissible) return children;

  if (user?.role === UserRole.ADMIN) {
    toast.error(Toasts.RESTRICTION.CUSTOMER_ONLY);
    return <Navigate to={PATHS.FRONT.HOME} replace />;
  }

  return <Navigate to={PATHS.FRONT.HOME} replace />;
}
