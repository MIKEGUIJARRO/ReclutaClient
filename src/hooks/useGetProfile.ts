import { useQuery } from '@tanstack/react-query';
import { ReclutaAPI } from '../services/reclutaAPI';

export const useGetProfile = () => {
  const reclutaApi = new ReclutaAPI();
  const { isLoading, error, data, refetch } = useQuery(
    ['profile'],
    async () => {
      const response = await reclutaApi.auth('getProfile');
      return response;
    }
  );
  return { isLoading, error, data, refetch };
};
