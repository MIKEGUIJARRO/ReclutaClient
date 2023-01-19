import React, { FC } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CardPosition } from './CardPosition';

interface CardPositionsContainer {
  data: CardPosition[];
}

export const CardPositionsContainer: FC<CardPositionsContainer> = ({
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
    title: string,
    description: string,
    candidates: number | string,
    createdAt: string
  ) => {
    const card = (
      <CardPosition
        key={id}
        id={id}
        title={title}
        description={description}
        candidates={candidates}
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
          to={'/home/positions/create'}
          className="btn btn-primary gap-2 btn-block"
        >
          <FiPlusCircle size={24} /> Agregar Posiciones
        </Link>
      </div>
      {data.map((card, index) =>
        renderCard(
          index,
          card.id,
          card.title,
          card.description,
          card.candidates,
          card.createdAt
        )
      )}
    </div>
  );
};
