import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FiAlertCircle, FiArrowLeft, FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../../components/ui/Toast';
import { ReclutaAPI } from '../../../services/reclutaAPI';

export const CreatePosition = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [warning, setWarning] = useState<null | string>(null);

  const mutationFn = async (options: Object) => {
    const reclutaAPI = new ReclutaAPI();
    const response = await reclutaAPI.positions('create', { body: options });
    return response;
  };

  const {
    data,
    error,
    isLoading,
    mutate: createPosition,
  } = useMutation(['positions'], mutationFn);

  const createPositionHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!validateForm(title, description)) {
      return;
    }
    createPosition({ title, description });
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

  return (
    <div className="">
      <Toast
        successMessage={data?.success ? 'Posición creada' : null}
        errorMessage={error ? 'Error al crear posición' : null}
      />
      <div className="flex gap-2">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => {
            navigate(-1);
          }}
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-4xl">Agregar Posición</h1>
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
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Descripción"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {warningRendering()}
            <button className="btn" onClick={createPositionHandler}>
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
