import React from 'react';
import { FiCompass } from 'react-icons/fi';

export const Logo = () => {
  return (
    <div className="flex justify-start items-center space-x-2">
      <FiCompass size={24} />
      <p className="text-xl font-semibold normal-case">recluta</p>
    </div>
  );
};
