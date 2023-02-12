import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { BackButton } from '../../../components/ui/BackButton';
import { Toast } from '../../../components/ui/Toast';
import { reclutaAPI } from '../../../services/recluta/ReclutaAPI';

export const CreateCandidate = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const [warning, setWarning] = useState<null | string>(null);

  const mutationFn = async (options: Object) => {
    const response = await reclutaAPI.candidates.create({ body: options });
    return response;
  };

  const {
    data,
    error,
    isLoading,
    mutate: createPosition,
  } = useMutation(['positions'], mutationFn);

  const createCandidateHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!validateForm(firstName, middleName, lastName)) {
      return;
    }
    createPosition({ firstName, middleName, lastName });
  };

  const validateForm = (
    firstName: string,
    middleName: string,
    lastName: string
  ) => {
    if (firstName.length < 3) {
      setWarning('Nombre demasiado corto');
      return false;
    } else if (lastName.length < 3) {
      setWarning('Apellido demasiado corto');
      return false;
    }
    setWarning(null);
    return true;
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
    <div className="">
      <Toast
        successMessage={data?.success ? 'Candidato creado' : null}
        errorMessage={error ? 'Error al crear candidato' : null}
      />
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="font-bold text-4xl">Agregar Candidato</h1>
      </div>
      <div className="divider"></div>

      <div className="space-y-4">
        <div>
          <form className="form-control w-full max-w-2xl space-y-4">
            <input
              type={'text'}
              placeholder="Primer Nombre"
              className="input input-bordered w-full"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type={'text'}
              placeholder="Segundo Nombre"
              className="input input-bordered w-full"
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <input
              type={'text'}
              placeholder="Apellidos"
              className="input input-bordered w-full"
              onChange={(e) => setLastName(e.target.value)}
            />
            {warningRendering()}
            <button
              className="btn btn-primary"
              onClick={createCandidateHandler}
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
