import { FC, ReactElement } from 'react';
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { KanbanColumn } from './KanbanColumn';

export interface Item<T> {
  id: string;
  content: T;
}

export interface Column {
  id: string;
  title: string;
  itemIds: string[];
}

export interface KanbanData<T> {
  items: {
    [key: string]: Item<T>;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}

export interface KanbanColumnOptionsButton {
  id?: string;
}

export interface KanbanColumnEndButton {
  id?: string;
}

export interface KanbanCardContent<T> {
  id?: string;
  index?: number;
  columnId?: string;
  content?: T;
}

interface KanbanBoard {
  kanbanCardContent: ReactElement<KanbanCardContent<any>>;
  kanbanColumnOptionsButton: ReactElement<KanbanColumnOptionsButton>;
  kanbanColumnEndButton: ReactElement<KanbanColumnEndButton>;
  kanbanData: KanbanData<any>;
  onDragEndHandler(result: DropResult, provided: ResponderProvided): void;
}

export const KanbanBoard: FC<KanbanBoard> = ({
  kanbanCardContent,
  kanbanData,
  kanbanColumnEndButton,
  kanbanColumnOptionsButton,
  onDragEndHandler,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className="flex justify-start items-start gap-8 overflow-auto py-8">
        {kanbanData &&
          kanbanData.columnOrder.map((columnId) => {
            const column = kanbanData.columns[columnId];
            const items = column.itemIds.map(
              (itemId) => kanbanData.items[itemId]
            );
            return (
              <KanbanColumn
                key={column.id}
                column={column}
                items={items}
                kanbanCardContent={kanbanCardContent}
                kanbanColumnEndButton={kanbanColumnEndButton}
                kanbanColumnOptionsButton={kanbanColumnOptionsButton}
              />
            );
          })}
      </div>
    </DragDropContext>
  );
};
