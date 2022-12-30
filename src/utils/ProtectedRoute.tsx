import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetProfile } from '../hooks/useGetProfile';

interface Props {
  children: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const { data, error, isLoading, refetch } = useGetProfile();

  if (!isLoading && (data?.success === false || error)) {
    return <Navigate to={'/'} />;
  }
  if (isLoading) {
    return <p>is loading!</p>;
  }

  return <div>{children}</div>;
};
