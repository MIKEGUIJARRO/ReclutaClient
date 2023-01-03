import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../../components/ui/BackButton';
import { Toast } from '../../../components/ui/Toast';
import { ReclutaAPI } from '../../../services/reclutaAPI';

export const UpdatePosition = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [warning, setWarning] = useState<null | string>(null);
  const { positionId } = useParams();
  const reclutaAPI = new ReclutaAPI();
  const {
    isLoading: isLoadingGet,
    error: errorGet,
    data: dataGet,
  } = useQuery(
    [`company/${positionId}`],
    async () => {
      const response = await reclutaAPI.positions('findOne', {
        id: positionId,
      });
      return response;
    },
    {}
  );

  useEffect(() => {
    if (dataGet?.data) {
      setTitle(dataGet?.data.title);
      setDescription(dataGet.data.description);
    }
  }, [dataGet]);

  const mutationFn = async (options: Object) => {
    const response = await reclutaAPI.positions('update', {
      body: options,
      id: positionId,
    });
    return response;
  };

  const {
    data: dataUpdate,
    error: errorUpdate,
    isLoading: isLoadingUpdate,
    mutate: updatePosition,
  } = useMutation(['positionsUpdate'], mutationFn);

  const createPositionHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!validateForm(title, description)) {
      return;
    }
    updatePosition({ title, description });
  };

  const validateForm = (title: string, description: string) => {
    if (title.length < 5) {
      setWarning('Titulo demasiado corto');
      return false;
    } else if (description.length < 5) {
      setWarning('Descripción demasiado corta');
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

  console.log(dataGet?.data);
  return (
    <div className="">
      <Toast
        successMessage={dataUpdate?.success ? 'Posición editada' : null}
        errorMessage={errorUpdate ? 'Error al editar posición' : null}
      />
      <div className="flex gap-2">
        <BackButton />
        <h1 className="font-bold text-4xl">Editar Posición</h1>
      </div>
      <div className="divider"></div>

      <div className="space-y-4">
        <div>
          <form className="form-control w-full max-w-2xl space-y-4">
            <input
              type={'text'}
              placeholder="Título"
              className="input input-bordered w-full"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Descripción"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
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
