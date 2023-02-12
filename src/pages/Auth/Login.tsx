import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

import { FiAlertCircle, FiCompass, FiXCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Gradient } from '../../components/ui/Gradient';
import { Logo } from '../../components/ui/Logo';
import { queryClient } from '../../constants/queryClient';
import { GenericOptions } from '../../services/base/BaseAPIEndpoint';
import { reclutaAPI } from '../../services/recluta/ReclutaAPI';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState<null | string>(null);
  const navigate = useNavigate();

  const mutationFn = async (options: GenericOptions) => {
    const response = await reclutaAPI.auth.loginLocal(options);
    return response;
  };

  const { data, mutate: loginUser } = useMutation(['profile'], mutationFn, {
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.setQueriesData(['profile'], data);
        navigate('/company-registration');
      }
    },
  });

  const loginHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validateLogin(email, password)) {
      return;
    }
    loginUser({ body: { email, password } });
  };

  const validateLogin = (email: string, password: string) => {
    const regEmail = /^\S+@\S+\.\S+$/;
    if (!regEmail.test(email)) {
      setWarning('Email invalido');
      return false;
    } else if (password.length < 4) {
      setWarning('Contraseña invalida');
      return false;
    }
    setWarning(null);
    return true;
  };

  const errorRendering = () => {
    if (data !== undefined && !data.success) {
      return (
        <div className="alert alert-error">
          <div>
            <FiXCircle size={24} />
            <span>{data.error}</span>
          </div>
        </div>
      );
    }
  };

  const warningRendering = () => {
    if (warning) {
      return (
        <div className="alert alert-warning">
          <div>
            <FiAlertCircle size={24} />
            <span>{warning}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-row justify-center items-stretch h-screen">
      <div className="flex-1 flex flex-col justify-center items-start relative">
        <Link to={'/'} className="btn btn-ghost m-8 absolute left-0 top-0">
          <Logo />
        </Link>
        <h1 className="pl-16 text-4xl font-bold max-w-md">
          Da seguimiento a tus candidatos y mantén a tu equipo sincronizado
        </h1>
        <div className="rounded-r-3xl absolute left-0 top-0 -z-20 h-screen overflow-hidden">
          <Gradient />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-center items-center h-full">
          <div className="bg-slate-200 p-8 rounded-3xl max-w-sm w-full flex flex-col justify-center items-center shadow-lg">
            <form className="form-control w-full space-y-4">
              <input
                type={'email'}
                placeholder="Email"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type={'password'}
                placeholder="Contraseña"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn" onClick={loginHandler}>
                Iniciar sesión
              </button>
              {warningRendering()}
              {errorRendering()}
            </form>
            <div className="divider">o</div>
            <div className="space-y-4 flex flex-col justify-center">
              <p>
                ¿Aún no tienes una cuenta?{' '}
                <Link to={'/signup'} className="link link-primary">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
