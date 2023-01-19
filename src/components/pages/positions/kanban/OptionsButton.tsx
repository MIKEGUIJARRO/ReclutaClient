import React, { FC } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { KanbanColumnOptionsButton } from '../../../ui/kanban/KanbanBoard';

export const OptionsButton: FC<KanbanColumnOptionsButton> = ({ id }) => {
  return (
    <button className="btn btn-ghost btn-sm btn-circle">
      <FiMoreHorizontal size={24} />
    </button>
  );
};
