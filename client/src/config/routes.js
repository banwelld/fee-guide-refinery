import App from '../app/App';
import AppLayout from '../app/AppLayout';
import AuthView from '../features/homepage/pages/PublicView';
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
              { index: true, element: <PublicView /> },
              { path: '*', element: <ErrorPage /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
