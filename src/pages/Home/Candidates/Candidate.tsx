import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../../components/ui/BackButton';
import { Toast } from '../../../components/ui/Toast';
import { ReclutaAPI } from '../../../services/reclutaAPI';

export const Candidate = () => {
  const { candidateId } = useParams();
  const reclutaAPI = new ReclutaAPI();
  const { data, isLoading, error } = useQuery(
    [`candidates/${candidateId}`],
    async () => {
      const response = await reclutaAPI.candidates('findOne', {
        id: candidateId,
      });
      return response;
    }
  );

  const mutationFn = async (options: Object) => {
    const reclutaAPI = new ReclutaAPI();
    const response = await reclutaAPI.candidates('delete', options);
    return response;
  };

  const { isSuccess: isSuccessDelete, mutate: deleteCandidate } = useMutation(
    [],
    mutationFn
  );

  const deleteCandidateHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    deleteCandidate({ id: candidateId });
  };

  return (
    <div>
      <Toast successMessage={isSuccessDelete ? 'Candidato eliminado' : null} />
      <div className="flex gap-2">
        <BackButton />
        <h1 className="font-bold text-4xl">
          {data?.data.firstName +
            ' ' +
            data?.data.middleName +
            ' ' +
            data?.data.lastName}
        </h1>
      </div>
      <div className="divider"></div>
      <div className="grid grid-cols-3 gap-8 pb-8">
        <Link
          to={`/home/candidates/update/${data?.data.id}`}
          className="btn btn-primary gap-2 btn-block"
        >
          <FiEdit size={24} /> Editar
        </Link>
        <button
          onClick={deleteCandidateHandler}
          className="btn btn-error gap-2 btn-block"
        >
          <FiEdit size={24} /> Eliminar
        </button>
      </div>
    </div>
  );
};
