import React from 'react';
import Landing from './pages/Landing';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error } from './pages/Error';
import { Signup } from './pages/Auth/Signup';
import { Login } from './pages/Auth/Login';
import { Home } from './pages/Home/Home';
import { Positions } from './pages/Home/Positions';
import { Candidates } from './pages/Home/Candidates';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './constants/queryClient';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { useGetProfile } from './hooks/useGetProfile';
import { Root } from './utils/Root';
import { ProtectedRouteAuth } from './utils/ProtectedRouteAuth';
import { Welcome } from './pages/Home/Welcome';
import { Configuration } from './pages/Home/Configuration';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Welcome />,
          },
          {
            path: 'positions',
            element: <Positions />,
          },
          {
            path: 'candidates',
            element: <Candidates />,
          },
          {
            path: 'configuration',
            element: <Configuration />,
          },
        ],
      },
      {
        path: '/signup',
        element: (
          <ProtectedRouteAuth>
            <Signup />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: '/login',
        element: (
          <ProtectedRouteAuth>
            <Login />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: '/',
        element: <Landing />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
