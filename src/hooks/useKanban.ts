import { useContext } from 'react';

import { KanbanContext } from '../context/KanbanContext';

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error('useKanban() must be used inside a <KanbanProvider />');
  }
  return context;
};
