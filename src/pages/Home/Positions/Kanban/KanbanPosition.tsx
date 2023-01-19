import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../../../components/ui/BackButton';
import { ReclutaAPI } from '../../../../services/reclutaAPI';
import { PositionKanbanWrapper } from '../../../../components/pages/positions/kanban/PositionKanbanWrapper';

export const KanbanPosition = () => {
  const { positionId } = useParams();
  const reclutaAPI = new ReclutaAPI();
  const { data, isLoading, error } = useQuery(
    [`positions/${positionId}/kanban`],
    async () => {
      const response = await reclutaAPI.kanbanPosition('findOne', {
        id: positionId,
      });
      return response;
    }
  );

  return (
    <div className="">
      <div className="">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="font-bold text-4xl">{data?.data.title}</h1>
        </div>
      </div>
      <div className="divider"></div>
      {positionId && (
        <PositionKanbanWrapper
          initialKanbanData={data?.data.kanbanData}
          positionId={positionId}
        />
      )}
    </div>
  );
};
