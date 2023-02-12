import { useQuery } from '@tanstack/react-query';
import { reclutaAPI } from '../services/recluta/ReclutaAPI';

export const useGetCompany = () => {
  const { isLoading, error, data, refetch } = useQuery(
    ['company'],
    async () => {
      const response = await reclutaAPI.company.findAll({});
      return response;
    },
    {}
  );
  return { isLoading, error, data, refetch };
};
