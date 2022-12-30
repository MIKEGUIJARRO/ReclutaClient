import React, { useState } from 'react';

import { FiAlertCircle, FiCompass, FiXCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { ReclutaAPI } from '../../services/reclutaAPI';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../constants/queryClient';
import { Gradient } from '../../components/ui/Gradient';
import { Logo } from '../../components/ui/Logo';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [warning, setWarning] = useState<null | string>(null);

  const navigate = useNavigate();

  const mutationFn = async (options: Object) => {
    const reclutaAPI = new ReclutaAPI();
    const response = await reclutaAPI.auth('signupLocal', options);
    return response;
  };

  const { data, mutate: signupUser } = useMutation(['profile'], mutationFn, {
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.setQueriesData(['profile'], data);
        navigate('/home');
      }
    },
  });

  const signupHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validateSignup(email, password, firstName, lastName)) {
      return;
    }
    signupUser({ email, password, firstName, lastName });
  };

  const validateSignup = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const regEmail = /^\S+@\S+\.\S+$/;
    if (firstName.length === 0) {
      setWarning('Nombre invalido');
      return false;
    } else if (lastName.length === 0) {
      setWarning('Apellido invalido');
      return false;
    } else if (!regEmail.test(email)) {
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
            <form className="form-control w-full space-y-4 transition-all">
              <input
                type={'text'}
                placeholder="Nombre"
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type={'text'}
                placeholder="Apellido"
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type={'email'}
                placeholder="Email"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type={'password'}
                placeholder="Contraseña"
                className="input w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={signupHandler} className="btn">
                Crear Cuenta
              </button>
              {warningRendering()}
              {errorRendering()}
            </form>
            <div className="divider">o</div>
            <div className="space-y-4 flex flex-col justify-center">
              <p>
                ¿Ya tienes una cuenta?{' '}
                <Link to={'/login'} className="link link-primary">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
