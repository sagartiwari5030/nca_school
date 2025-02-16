import { Navigate, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { mainRoutes, LandingPage } from './main';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
        <MainLayout>
          <LandingPage />
        </MainLayout>
      ),
    },
    
    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    ...mainRoutes,


    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
