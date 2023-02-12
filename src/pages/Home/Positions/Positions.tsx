import { useQuery } from '@tanstack/react-query';
import { CardPositionsContainer } from '../../../components/pages/positions/CardPositionsContainer';
import { reclutaAPI } from '../../../services/recluta/ReclutaAPI';

export const Positions = () => {
  const { data, isLoading, error } = useQuery(['positions'], async () => {
    const response = await reclutaAPI.positions.findAll({});
    return response;
  });

  return (
    <div className="">
      <h1 className="font-bold text-4xl">Posiciones</h1>
      <div className="divider"></div>
      <div>{data?.success && <CardPositionsContainer data={data?.data} />}</div>
    </div>
  );
};
