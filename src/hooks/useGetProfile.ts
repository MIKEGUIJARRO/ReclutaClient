import { useQuery } from '@tanstack/react-query';
import { reclutaAPI } from '../services/recluta/ReclutaAPI';

export const useGetProfile = () => {
  const { isLoading, error, data, refetch } = useQuery(
    ['profile'],
    async () => {
      const response = await reclutaAPI.auth.getProfile({});
      return response;
    }
  );
  return { isLoading, error, data, refetch };
};
