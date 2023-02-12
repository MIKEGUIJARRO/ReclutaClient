import { useMutation } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import { useKanban } from '../../../../hooks/useKanban';
import { reclutaAPI } from '../../../../services/recluta/ReclutaAPI';
import { KanbanCardContent } from '../../../ui/kanban/KanbanBoard';
import { ContentDataPosition } from './PositionKanbanWrapper';

export const CardContent: FC<KanbanCardContent<ContentDataPosition>> = ({
  id,
  content,
  columnId,
  index,
}) => {
  const kanbanContext = useKanban();
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);

  const toggleMenuState = (): void => {
    setIsOptionMenuOpen((prevState) => !prevState);
  };

  const mutationFn = async () => {
    if (content) {
      const response = await reclutaAPI.candidatesStatus.delete({
        id: content.candidateStatusId,
        params: {
          candidateId: content?.candidateId,
          positionId: content?.positionId,
        },
      });
      return response;
    } else {
      throw Error('candidateId or positionId undefined');
    }
  };

  const {
    isSuccess: isSuccessDeleteCandidatesStatus,
    mutate: deleteCandidatesStatus,
  } = useMutation([], mutationFn);

  useEffect(() => {
    if (isSuccessDeleteCandidatesStatus && id && columnId) {
      kanbanContext?.deleteItem(id, columnId);
    }
  }, [isSuccessDeleteCandidatesStatus]);

  const deleteCandidateHandler = (): void => {
    deleteCandidatesStatus();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center gap-2">
        <p className="">{content?.firstName}</p>
        <div
          className={`dropdown dropdown-end ${
            isOptionMenuOpen ? 'dropdown-open' : ''
          }`}
        >
          <label
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => toggleMenuState()}
          >
            <FiMoreHorizontal />
          </label>
          <ul className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box ">
            <li>
              <a onClick={deleteCandidateHandler}>Eliminar</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button className="hidden btn btn-ghost btn-circle btn-sm">
          <FiMessageCircle size={18} />
        </button>
      </div>
    </div>
  );
};
