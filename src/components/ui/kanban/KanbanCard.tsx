import React, { FC, ReactElement } from 'react';
import { Item, KanbanCardContent } from './KanbanBoard';
import { Draggable } from 'react-beautiful-dnd';

interface KanbanCard {
  item: Item<any>;
  index: number;
  columnId: string;
  kanbanCardContent: ReactElement<KanbanCardContent<any>>;
}

export const KanbanCard: FC<KanbanCard> = ({
  item,
  index,
  kanbanCardContent,
  columnId,
}) => {
  const renderContent = () => {
    if (React.isValidElement(kanbanCardContent)) {
      return React.cloneElement(kanbanCardContent, {
        id: item.id,
        index: index,
        content: item.content,
        columnId: columnId,
      });
    }
  };

  return (
    <Draggable draggableId={item.id} index={index} isDragDisabled={false}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={'mb-4'}
          >
            <div
              className={`bg-white p-4 rounded-md transition-color duration-500 outline-dashed outline-transparent outline-2 ${
                snapshot.isDragging ? 'outline-base-300 shadow-2xl' : ''
              }`}
            >
              {renderContent()}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
