import React from 'react';
import Landing from './pages/Landing';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error } from './pages/Error';
import { Signup } from './pages/Auth/Signup';
import { Login } from './pages/Auth/Login';
import { Home } from './pages/Home/Home';
import { Positions } from './pages/Home/Positions/Positions';
import { Candidates } from './pages/Home/Candidates/Candidates';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './constants/queryClient';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Root } from './utils/Root';
import { ProtectedRouteAuth } from './utils/ProtectedRouteAuth';
import { Welcome } from './pages/Home/Welcome';
import { Configuration } from './pages/Home/Configuration';
import { CreatePosition } from './pages/Home/Positions/CreatePosition';
import { CompanyRegistration } from './pages/Auth/CompanyRegistration';
import { Position } from './pages/Home/Positions/Position';
import { UpdatePosition } from './pages/Home/Positions/UpdatePosition';
import { Candidate } from './pages/Home/Candidates/Candidate';
import { UpdateCandidate } from './pages/Home/Candidates/UpdateCandidate';
import { CreateCandidate } from './pages/Home/Candidates/CreateCandidate';
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
          // Positions
          {
            path: 'positions',
            element: <Positions />,
          },
          {
            path: 'positions/:positionId',
            element: <Position />,
          },
          {
            path: 'positions/create',
            element: <CreatePosition />,
          },
          {
            path: 'positions/update/:positionId',
            element: <UpdatePosition />,
          },
          //Candidates
          {
            path: 'candidates',
            element: <Candidates />,
          },
          {
            path: 'candidates/:candidateId',
            element: <Candidate />,
          },
          {
            path: 'candidates/create',
            element: <CreateCandidate />,
          },
          {
            path: 'candidates/update/:candidateId',
            element: <UpdateCandidate />,
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
        path: '/company-registration',
        element: (
          <ProtectedRoute>
            <CompanyRegistration />
          </ProtectedRoute>
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
