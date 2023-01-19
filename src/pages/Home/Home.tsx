import { useMutation } from '@tanstack/react-query';
import React from 'react';
import {
  FiClipboard,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { queryClient } from '../../constants/queryClient';
import { useGetProfile } from '../../hooks/useGetProfile';
import { ReclutaAPI } from '../../services/reclutaAPI';

export const Home = () => {
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useGetProfile();

  const mutationFn = async () => {
    const reclutaAPI = new ReclutaAPI();
    const response = await reclutaAPI.auth('logout');
    return response;
  };

  const { mutate: logoutUser } = useMutation(['profile'], mutationFn, {
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.removeQueries(['profile']);
        queryClient.removeQueries(['company']);
        navigate('/');
      }
    },
  });

  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost drawer-button lg:hidden absolute top-0 left-0 m-2"
          >
            <FiMenu size={24} />
          </label>
          <div className="m-8">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="menu bg-base-200 px-8 py-8 w-80  text-base-content">
            <div className="flex flex-col items-stretch justify-between h-full">
              <ul className="space-y-1">
                {/* Side bar content here */}
                <li className="mb-16">
                  <Link to={''} className="flex justify-center">
                    <Logo />
                  </Link>
                </li>
                <li>
                  <Link to={''}>
                    <FiHome size={24} />
                    <span className="font-semibold">Inicio</span>
                  </Link>
                </li>
                <li>
                  <Link to={'positions'}>
                    <FiClipboard size={24} />
                    <span className="font-semibold">Posiciones</span>
                  </Link>
                </li>
                <li>
                  <Link to={'candidates'}>
                    <FiUsers size={24} />
                    <span className="font-semibold">Candidatos</span>
                  </Link>
                </li>
                {/* <div className="divider py-4"></div>
                <li>
                  <Link to={'configuration'}>
                    <FiSettings size={24} />
                    <span className="font-semibold">Configuración</span>
                  </Link>
                </li> */}
              </ul>
              <ul>
                <li>
                  <button
                    className="btn btn-error"
                    onClick={() => logoutUser()}
                  >
                    <FiLogOut size={24} /> Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
