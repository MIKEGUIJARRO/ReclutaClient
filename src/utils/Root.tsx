import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetProfile } from '../hooks/useGetProfile';

export const Root = () => {
  const { data, error, isLoading, refetch } = useGetProfile();
  console.log(data);
  console.log(error);
  console.log(isLoading);
  return <Outlet />;
};
