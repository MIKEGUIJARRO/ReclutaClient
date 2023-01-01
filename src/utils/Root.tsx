import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetCompany } from '../hooks/useGetCompany';
import { useGetProfile } from '../hooks/useGetProfile';

export const Root = () => {
  const { data: dataProfile } = useGetProfile();
  const { data: dataCompany } = useGetCompany();

  return <Outlet />;
};
