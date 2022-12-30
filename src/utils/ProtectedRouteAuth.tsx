import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetProfile } from '../hooks/useGetProfile';

interface Props {
  children: ReactNode;
}

export const ProtectedRouteAuth: FC<Props> = ({ children }) => {
  const { data, error, isLoading, refetch } = useGetProfile();

  if (data && data.success) {
    return <Navigate to={'/home'} />;
  }
  if (isLoading) {
    return <p>is loading!</p>;
  }

  return <div>{children}</div>;
};
