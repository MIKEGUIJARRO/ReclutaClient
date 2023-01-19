import React, { FC, useEffect } from 'react';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useKanban } from '../../../../hooks/useKanban';
import { useGlobalModalContext } from '../../../../hooks/useModalContext';
import { ReclutaAPI } from '../../../../services/reclutaAPI';
import { KanbanBoard, KanbanData } from '../../../ui/kanban/KanbanBoard';
import { AddCandidateModal } from './AddCandidateModal';
import { AddItemButton } from './AddItemButton';
import { CardContent } from './CardContent';
import { OptionsButton } from './OptionsButton';

export interface ContentDataPosition {
  positionId: string;
  candidateStatusId: string;
  candidateId: string;
  firstName: string;
}

interface PositionKanbanWrapper {
  initialKanbanData: KanbanData<ContentDataPosition> | null;
  positionId: string;
}

export const PositionKanbanWrapper: FC<PositionKanbanWrapper> = ({
  initialKanbanData,
  positionId,
}) => {
  const { initModal, hideModal, showModal } = useGlobalModalContext();
  const kanbanContext = useKanban();
  const kanbanData = kanbanContext?.kanbanState;

  useEffect(() => {
    if (!initialKanbanData) {
      return;
    }
    console.log('KanbanWrapper');
    console.log(initialKanbanData);
    kanbanContext?.loadData(initialKanbanData);
  }, [initialKanbanData]);

  const updateCandidateStatus = (
    id: string,
    stage: string,
    candidateId: string,
    positionId: string,
    index: number
  ) => {
    const reclutaAPI = new ReclutaAPI();
    reclutaAPI
      .candidatesStatus('update', {
        id: id,
        body: { stage: stage, index: index },
        params: {
          candidateId: candidateId,
          positionId: positionId,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const onDragEndHandler = (
    result: DropResult,
    provided: ResponderProvided
  ) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (destination && source && draggableId) {
      kanbanContext?.dropItem({
        destination: {
          droppableId: destination.droppableId,
          index: destination.index,
        },
        source: {
          droppableId: source.droppableId,
          index: source.index,
        },
        draggableId: draggableId,
      });
    }
    if (kanbanData) {
      const item = kanbanData.items[draggableId];
      const content: ContentDataPosition = item.content as ContentDataPosition;
      console.log(content.candidateStatusId);
      updateCandidateStatus(
        content.candidateStatusId,
        destination.droppableId,
        content.candidateId,
        positionId,
        destination.index
      );
    }
  };

  const addCandidateHandler = (stage: string) => {
    initModal(
      <AddCandidateModal
        hideModal={hideModal}
        showModal={showModal}
        stage={stage}
        positionId={positionId}
      />
    );
  };

  return (
    <div>
      <div>
        {kanbanData && (
          <KanbanBoard
            kanbanCardContent={<CardContent />}
            kanbanData={kanbanData}
            kanbanColumnOptionsButton={<OptionsButton />}
            kanbanColumnEndButton={
              <AddItemButton onClick={addCandidateHandler} />
            }
            onDragEndHandler={onDragEndHandler}
          />
        )}
      </div>
    </div>
  );
};
