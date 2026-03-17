import App from '../app/App';
import AppLayout from '../app/AppLayout';
import PublicView from '../features/homepage/pages/PublicView';
import GridView from '../features/collection/pages/grid-view/pages/GridView';
import ErrorPage from '../pages/ErrorPage';

import { AdminRoute, PublicRoute, ProtectedRoute } from '../components/Guards';
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
              {
                index: true,
                element: (
                  <PublicRoute>
                    <PublicView />
                  </PublicRoute>
                ),
              },
              {
                path: PATHS.FRONT.DASHBOARD,
                element: (
                  <ProtectedRoute>
                    <GridView />
                  </ProtectedRoute>
                ),
              },
              { path: '*', element: <ErrorPage /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
