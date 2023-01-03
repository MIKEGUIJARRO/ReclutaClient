import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CardCandidatesContainer } from '../../../components/pages/candidates/CardCandidatesContainer';
import { ReclutaAPI } from '../../../services/reclutaAPI';

export const Candidates = () => {
  const reclutaAPI = new ReclutaAPI();
  const { data, isLoading, error } = useQuery(['positions'], async () => {
    const response = await reclutaAPI.candidates('findAll', {});
    return response;
  });
  return (
    <div>
      <h1 className="font-bold text-4xl">Candidatos</h1>
      <div className="divider"></div>
      <div>
        {data?.success && (
          <div>
            <CardCandidatesContainer data={data.data} />
          </div>
        )}{' '}
      </div>
    </div>
  );
};
