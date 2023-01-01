import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FiArrowLeft, FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const CreatePosition = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descripción, setDescripción] = useState('');

  const mutationFn = () => {};
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="font-bold text-4xl">Agregar Posición</h1>
        <div className="divider"></div>
        <button
          className="btn btn-ghost gap-2"
          onClick={() => {
            navigate(-1);
          }}
        >
          <FiArrowLeft size={24} /> Regresar
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <form className="form-control w-full max-w-2xl space-y-4">
            <input
              type={'text'}
              placeholder="Título"
              className="input input-bordered w-full"
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Descripción"
            ></textarea>

            <button className="btn" onClick={() => {}}>
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
