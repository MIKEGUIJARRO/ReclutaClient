import { useQuery } from '@tanstack/react-query';
import { ReclutaAPI } from '../services/reclutaAPI';

export const useGetProfile = () => {
  const reclutaApi = new ReclutaAPI();
  const { isLoading, error, data, refetch } = useQuery(
    ['profile'],
    async () => {
      const response = reclutaApi.auth('getProfile');
      return response;
    },
    { staleTime: 1000 * 60 * 30 }
  );
  return { isLoading, error, data, refetch };
};
