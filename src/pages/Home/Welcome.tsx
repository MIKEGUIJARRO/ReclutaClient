import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { useGetProfile } from '../../hooks/useGetProfile';

export const Welcome = () => {
  const { data } = useGetProfile();
  return (
    <div>
      <h1 className="font-bold text-4xl">Inicio</h1>
      <div className="divider"></div>

      <div className="space-y-8 px-8">
        <h2 className="font-bold text-3xl">
          Hola {data?.data.user.firstName}! 👋
        </h2>
        <p>
          Empieza a explorar la plataforma de recluta de una manera sencilla 🍃.
        </p>
        <ul className="steps steps-vertical overflow-visible">
          <li className="step">Empieza creando posiciones de trabajo</li>
          <li className="step ">Agrega tus candidatos de manera global</li>
          <li className="step">
            <div className="flex justify-start items-center gap-2">
              <span>Agrega a tus candidatos a cada una de sus posiciones</span>
              <div
                className="tooltip"
                data-tip="Actualmente solo puedes tener un candidato por posición."
              >
                <button className="flex items-center justify-center">
                  <FiInfo />
                </button>
              </div>
            </div>
          </li>
          <li className="step">
            Mueve a tus candidatos dentro de su proceso de selección
          </li>
        </ul>
      </div>
    </div>
  );
};
