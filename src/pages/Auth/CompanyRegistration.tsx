import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Gradient } from '../../components/ui/Gradient';
import { Logo } from '../../components/ui/Logo';
import { queryClient } from '../../constants/queryClient';
import { useGetCompany } from '../../hooks/useGetCompany';
import { GenericOptions } from '../../services/base/BaseAPIEndpoint';
import { reclutaAPI } from '../../services/recluta/ReclutaAPI';

export const CompanyRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [companySize, setCompanySize] = useState('');

  const [warning, setWarning] = useState<null | string>(null);

  const navigate = useNavigate();

  const { data: companyData } = useGetCompany();

  useEffect(() => {
    if (
      companyData &&
      companyData.success &&
      companyData.data &&
      companyData.data.length > 0
    ) {
      navigate('/home');
    }
  }, [companyData]);

  const mutationFn = async (options: GenericOptions) => {
    const response = await reclutaAPI.company.create(options);
    return response;
  };

  const { data, mutate: createCompany } = useMutation(['company'], mutationFn, {
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.setQueriesData(['company'], data);
        navigate('/home');
      }
    },
  });

  const loginHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validateLogin(companyName, website, companySize)) {
      return;
    }
    createCompany({
      body: { name: companyName, website: website, companySize: companySize },
    });
  };

  const validateLogin = (
    companyName: string,
    website: string,
    companySize: string
  ) => {
    const websiteRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    if (companyName.length === 0) {
      setWarning('Escribe el nombre de la empresa');
      return false;
    } else if (website.length === 0 || !websiteRegex.test(website)) {
      setWarning('Página web invalida');
      return false;
    } else if (
      companySize.length === 0 ||
      companySize === 'Tamaño de la empresa'
    ) {
      setWarning('Selecciona un tamaño de la empresa');
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
          Agrega tu compañia, estas a un click de terminar tu registro{' '}
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
                placeholder="Empresa"
                className="input input-bordered w-full"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type={'url'}
                placeholder="Página Web"
                className="input input-bordered w-full"
                onChange={(e) => setWebsite(e.target.value)}
              />
              <select
                className="select w-full max-w-xs"
                onChange={(e) => setCompanySize(e.target.value)}
                defaultValue={'DEFAULT'}
              >
                <option value={'DEFAULT'} disabled>
                  Tamaño de la empresa
                </option>
                <option value={'micro'}>Menos de 5 empleados</option>
                <option value={'small'}>5 - 20 empleados</option>
                <option value={'medium'}>20 - 100 empleados</option>
                <option value={'large'}>+ 100 empleados</option>
              </select>
              <button className="btn" onClick={loginHandler}>
                Continuar
              </button>
              {warningRendering()}
              {errorRendering()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
