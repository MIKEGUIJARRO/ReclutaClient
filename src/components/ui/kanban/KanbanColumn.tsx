import React, { ReactElement } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {
  Column,
  Item,
  KanbanCardContent,
  KanbanColumnEndButton,
  KanbanColumnOptionsButton,
} from './KanbanBoard';
import { KanbanCard } from './KanbanCard';

interface KanbanColumn<T> {
  column: Column;
  items: Item<T>[];
  kanbanCardContent: ReactElement<KanbanCardContent<any>>;
  kanbanColumnOptionsButton: ReactElement<KanbanColumnOptionsButton>;
  kanbanColumnEndButton: ReactElement<KanbanColumnEndButton>;
}

export const KanbanColumn = <T extends any>({
  column,
  items,
  kanbanCardContent,
  kanbanColumnEndButton,
  kanbanColumnOptionsButton,
}: KanbanColumn<T>) => {
  return (
    /* Container */
    <div
      id={column.id}
      style={{ minWidth: '300px' }}
      className="flex flex-col justify-start items-stretch bg-base-200 rounded-xl p-4 transition-all duration-1000"
    >
      {/* Title */}
      <div className="h-[3em] flex justify-between items-center">
        <h2 className="font-bold">{column.title}</h2>
        {kanbanColumnOptionsButton && (
          <div>
            {React.cloneElement(kanbanColumnOptionsButton, { id: column.id })}
          </div>
        )}
      </div>
      <div className="divider"></div>
      {/* Item Lists */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`min-h-16 rounded-md outline-dashed outline-transparent outline-2 transition-all duration-1000 ${
                snapshot.isDraggingOver ? 'outline-base-300 bg-base-300' : ''
              }`}
            >
              {items.map((item, index) => (
                <KanbanCard
                  key={item.id}
                  item={item}
                  index={index}
                  kanbanCardContent={kanbanCardContent}
                  columnId={column.id}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      {kanbanColumnEndButton && (
        <div>
          <div className="divider"></div>
          {React.cloneElement(kanbanColumnEndButton, { id: column.id })}
        </div>
      )}
    </div>
  );
};
