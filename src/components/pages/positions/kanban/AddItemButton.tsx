import { FC } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { KanbanColumnEndButton } from '../../../ui/kanban/KanbanBoard';

interface Props extends KanbanColumnEndButton {
  onClick(id?: string): void;
}

export const AddItemButton: FC<Props> = ({ onClick, id }) => {
  return (
    <button
      className="btn btn-ghost btn-block gap-2"
      onClick={(e) => {
        e.preventDefault();
        onClick(id);
      }}
    >
      <FiPlusCircle size={24} /> Agregar candidato
    </button>
  );
};
