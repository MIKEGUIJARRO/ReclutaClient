import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  FiAlertCircle,
  FiEdit,
  FiInfo,
  FiPlusCircle,
  FiXCircle,
} from 'react-icons/fi';
import {
  CreateStages,
  PositionStages,
} from '../../../components/pages/positions/CreateStages';
import { BackButton } from '../../../components/ui/BackButton';
import { Toast } from '../../../components/ui/Toast';
import { reclutaAPI } from '../../../services/recluta/ReclutaAPI';

export const CreatePosition = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stages, setStages] = useState<PositionStages>([
    { name: '🏁 Registro candidato', isEditing: false },
    { name: '🎤 Entrevista inicial', isEditing: false },
    { name: '⚒️ Entrevista técnica', isEditing: false },
    { name: '✨ Entrevista final', isEditing: false },
    { name: '💰 Propuesta laboral', isEditing: false },
  ]);
  const [warning, setWarning] = useState<null | string>(null);

  const mutationFn = async (options: Object) => {
    const response = await reclutaAPI.positions.create({ body: options });
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
    const stagesBody = stages.map((stage) => stage.name);
    createPosition({ title, description, stages: stagesBody });
  };

  const validateForm = (title: string, description: string) => {
    if (title.length < 5) {
      setWarning('Titulo demasiado corto');
      return false;
    } else if (description.length < 5) {
      setWarning('Descripción demasiado corta');
      return false;
    } else if (stages.length < 2) {
      setWarning('Necesitas al menos 2 etapas en tu proceso');
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
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="font-bold text-4xl">Agregar Posición</h1>
      </div>
      <div className="divider"></div>

      <div className="flex flex-col space-y-8">
        <h2 className="font-bold text-2xl">Información General</h2>
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
          </form>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-2xl">Etapas Del Proceso</h2>
          <div
            className="tooltip"
            data-tip="Una vez guardadas las etapas del proces, no podras editarlas. 🚨"
          >
            <button className="flex items-center justify-center">
              <FiInfo />
            </button>
          </div>
        </div>

        <CreateStages stages={stages} setStages={setStages} />
        {warningRendering()}

        <button className="btn btn-primary" onClick={createPositionHandler}>
          Agregar
        </button>
      </div>
    </div>
  );
};
