import React, { FC } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CardCandidate } from './CardCandidate';

interface CardCandidatesContainer {
  data: CardCandidate[];
}

export const CardCandidatesContainer: FC<CardCandidatesContainer> = ({
  data,
}) => {
  const transformCreatedAt = (createdAt: string) => {
    const today = new Date();
    const date = new Date(createdAt);
    const days = today.getDate() - date.getDate();
    if (days === 0) {
      return 'Hoy';
    }
    return days + 'd';
  };
  const renderCard = (
    index: number,
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    positions: number | string,
    createdAt: string
  ) => {
    const card = (
      <CardCandidate
        key={id}
        id={id}
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        positions={positions}
        createdAt={transformCreatedAt(createdAt)}
      />
    );

    if (index === 0) {
      return (
        <div className="col-start-1" key={id}>
          {card}
        </div>
      );
    }
    return card;
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="row-span-1 col-span-1 col-start-1">
        <Link
          to={'/home/candidates/create'}
          className="btn btn-primary gap-2 btn-block"
        >
          <FiPlusCircle size={24} /> Agregar Candidato
        </Link>
      </div>
      {data.map((card, index) =>
        renderCard(
          index,
          card.id,
          card.firstName,
          card.middleName,
          card.lastName,
          card.positions,
          card.createdAt
        )
      )}
    </div>
  );
};
