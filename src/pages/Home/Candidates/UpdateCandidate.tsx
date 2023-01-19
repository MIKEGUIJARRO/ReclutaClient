import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../../components/ui/BackButton';
import { Toast } from '../../../components/ui/Toast';
import { ReclutaAPI } from '../../../services/reclutaAPI';

export const UpdateCandidate = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [warning, setWarning] = useState<null | string>(null);
  const { candidateId } = useParams();
  const reclutaAPI = new ReclutaAPI();
  const {
    isLoading: isLoadingGet,
    error: errorGet,
    data: dataGet,
  } = useQuery(
    [`candidates/${candidateId}`],
    async () => {
      const response = await reclutaAPI.candidates('findOne', {
        id: candidateId,
      });
      return response;
    },
    {}
  );

  useEffect(() => {
    if (dataGet?.success) {
      setFirstName(dataGet?.data.firstName);
      setMiddleName(dataGet.data.middleName);
      setLastName(dataGet.data.lastName);
    }
  }, [dataGet]);

  const mutationFn = async (options: Object) => {
    const response = await reclutaAPI.candidates('update', {
      body: options,
      id: candidateId,
    });
    return response;
  };

  const {
    data: dataUpdate,
    error: errorUpdate,
    isLoading: isLoadingUpdate,
    mutate: updatePosition,
  } = useMutation(['candidatesUpdate'], mutationFn);

  const createPositionHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!validateForm(firstName, middleName, lastName)) {
      return;
    }
    updatePosition({ firstName, middleName, lastName });
  };

  const validateForm = (
    firstName: string,
    middleName: string,
    lastName: string
  ) => {
    if (firstName.length < 2) {
      setWarning('Nombre demasiado corto');
      return false;
    } else if (lastName.length < 2) {
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

  console.log(dataGet);
  return (
    <div className="">
      <Toast
        successMessage={dataUpdate?.success ? 'Posición editada' : null}
        errorMessage={errorUpdate ? 'Error al editar posición' : null}
      />
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="font-bold text-4xl">Editar Candidato</h1>
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
              value={firstName}
            />
            <input
              type={'text'}
              placeholder="Segundo Nombre"
              className="input input-bordered w-full"
              onChange={(e) => setMiddleName(e.target.value)}
              value={middleName}
            />
            <input
              type={'text'}
              placeholder="Apellido"
              className="input input-bordered w-full"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            {warningRendering()}
            <button className="btn btn-primary" onClick={createPositionHandler}>
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
