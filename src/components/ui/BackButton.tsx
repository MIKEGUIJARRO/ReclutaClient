import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-ghost btn-circle"
      onClick={() => {
        navigate(-1);
      }}
    >
      <FiArrowLeft size={24} />
    </button>
  );
};
