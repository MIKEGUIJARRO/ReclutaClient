import { useQuery } from '@tanstack/react-query';
import { ReclutaAPI } from '../services/reclutaAPI';

export const useGetCompany = () => {
  const reclutaApi = new ReclutaAPI();
  const { isLoading, error, data, refetch } = useQuery(
    ['company'],
    async () => {
      const response = await reclutaApi.company('findAll', {});
      console.log(response);
      return response;
    },
    {}
  );
  return { isLoading, error, data, refetch };
};
