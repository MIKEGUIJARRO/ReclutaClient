import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../../components/ui/BackButton';
import { Toast } from '../../../components/ui/Toast';
import { GenericOptions } from '../../../services/base/BaseAPIEndpoint';
import { reclutaAPI } from '../../../services/recluta/ReclutaAPI';

export const Position = () => {
  const { positionId } = useParams();
  const { data, isLoading, error } = useQuery(
    [`positions/${positionId}`],
    async () => {
      const response = await reclutaAPI.positions.findOne({
        id: positionId,
      });
      return response;
    }
  );

  const mutationFn = async (options: GenericOptions) => {
    const response = await reclutaAPI.positions.delete(options);
    return response;
  };

  const { isSuccess: isSuccessDelete, mutate: deletePosition } = useMutation(
    [],
    mutationFn
  );

  const deletePositionHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    deletePosition({ id: positionId });
  };

  return (
    <div>
      <Toast successMessage={isSuccessDelete ? 'Posición eliminada' : null} />
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="font-bold text-4xl">{data?.data.title}</h1>
      </div>
      <div className="divider"></div>
      <div className="grid grid-cols-3 gap-8 pb-8">
        <Link
          to={`/home/positions/update/${data?.data.id}`}
          className="btn btn-primary gap-2 btn-block"
        >
          <FiEdit size={24} /> Editar
        </Link>
        <button
          onClick={deletePositionHandler}
          className="btn btn-error gap-2 btn-block"
        >
          <FiEdit size={24} /> Eliminar
        </button>
      </div>
      <p className="max-w-2xl whitespace-pre-wrap">{data?.data.description}</p>
    </div>
  );
};
