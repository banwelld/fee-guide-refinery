import App from '../app/App';
import AppLayout from '../app/AppLayout';
import PublicView from '../features/homepage/pages/PublicView';
import GridView from '../features/collection/pages/grid-view/pages/GridView';
import GuideView from '../features/collection/pages/guide-view/GuideView';
import RefineView from '../features/refinery/pages/RefineView';
import ExportView from '../features/export/pages/Export';
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
              {
                path: PATHS.FRONT.REFINERY,
                element: (
                  <ProtectedRoute>
                    <RefineView />
                  </ProtectedRoute>
                ),
              },
              {
                path: `${PATHS.FRONT.MAINTENANCE}/:id`,
                element: (
                  <ProtectedRoute>
                    <GuideView />
                  </ProtectedRoute>
                ),
              },
              {
                path: PATHS.FRONT.EXPORT,
                element: (
                  <ProtectedRoute>
                    <ExportView />
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
