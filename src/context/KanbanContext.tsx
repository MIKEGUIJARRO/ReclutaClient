import { FC, createContext, useReducer, ReactNode, Reducer } from 'react';
import { Column, KanbanData } from '../components/ui/kanban/KanbanBoard';

interface SelectedItemState {
  destination: {
    droppableId: string;
    index: number;
  };
  source: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
}

interface KanbanContext<M> {
  kanbanState: KanbanData<M> | null;
  dropItem(selectedItemState: SelectedItemState): void;
  loadData(kanbanData: KanbanData<M>): void;
  deleteItem(itemId: string, columnId: string): void;
}

export const KanbanContext = (<T extends any>() => {
  return createContext<KanbanContext<T> | null>(null);
})();

type Action =
  | {
      type: 'DROP';
      payload: SelectedItemState;
    }
  | {
      type: 'LOAD';
      payload: KanbanData<any>;
    }
  | {
      type: 'DELETE_ITEM';
      payload: { itemId: string; columnId: string };
    };

const kanbanReducer: Reducer<KanbanData<any>, Action> = (state, action) => {
  switch (action.type) {
    case 'DROP':
      const columnStart = state.columns[action.payload.source.droppableId];
      const columnFinish =
        state.columns[action.payload.destination.droppableId];
      const source = action.payload.source;
      const destination = action.payload.destination;
      const draggableId = action.payload.draggableId;
      if (columnStart === columnFinish) {
        const newItemIds = Array.from(columnStart.itemIds);
        newItemIds.splice(source.index, 1);
        newItemIds.splice(destination.index, 0, draggableId);
        const newColumn: Column = { ...columnStart, itemIds: newItemIds };
        return {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };
      }

      // Moving from one list to another
      const columnStartItemsIds = Array.from(columnStart.itemIds);
      columnStartItemsIds.splice(source.index, 1);
      const newColumnStart: Column = {
        ...columnStart,
        itemIds: columnStartItemsIds,
      };

      const columnFinishItemIds = Array.from(columnFinish.itemIds);
      columnFinishItemIds.splice(destination.index, 0, draggableId);
      const newColumnFinish: Column = {
        ...columnFinish,
        itemIds: columnFinishItemIds,
      };

      return {
        ...state,
        columns: {
          ...state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish,
        },
      };
    case 'LOAD':
      return { ...action.payload };
    case 'DELETE_ITEM':
      const column = state.columns[action.payload.columnId];
      let index: number;
      const itemIdIndex = column.itemIds.findIndex(
        (itemId) => itemId === action.payload.itemId
      );
      column.itemIds.splice(itemIdIndex, 1);

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.columnId]: column,
        },
      };

    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

export const KanbanProvider: FC<Props> = ({ children }) => {
  const initialData: KanbanData<string> = {
    items: {},
    columns: {},
    columnOrder: [],
  };
  const [state, dispatch] = useReducer(kanbanReducer, initialData);

  const deleteItem = (itemId: string, columnId: string): void => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: { itemId: itemId, columnId: columnId },
    });
  };

  const dropItem = (selectedItemState: SelectedItemState) => {
    dispatch({ type: 'DROP', payload: selectedItemState });
  };

  const loadData = (kanbanData: KanbanData<any>) => {
    dispatch({ type: 'LOAD', payload: kanbanData });
  };

  return (
    <KanbanContext.Provider
      value={{ dropItem, loadData, deleteItem, kanbanState: { ...state } }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
