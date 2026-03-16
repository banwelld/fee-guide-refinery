import App from '../app/App';
import AppLayout from '../app/AppLayout';
import ErrorPage from '../pages/ErrorPage';

import {
  AdminRoute,
  GuestRoute,
  ProtectedRoute,
} from '../components/utility/Guards';
import PATHS from './paths';

const routes = [
  {
    path: PATHS.FRONT.HOME,
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <AuthView /> },
              { path: '*', element: <ErrorPage /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
