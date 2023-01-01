import React, { FC } from 'react';
import { FiClock, FiEdit, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface CardPosition {
  id: string;
  title: string;
  description: string;
  candidates: number | string;
  createdAt: string;
}

export const CardPosition: FC<CardPosition> = ({
  id,
  title,
  description,
  candidates,
  createdAt,
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="card-title line-clamp-2">{title}</h2>
            <Link
              to={`/home/positions/${id}`}
              className="btn btn-ghost btn-md  btn-square"
            >
              <FiEdit size={22} />
            </Link>
          </div>
        </div>
        <div>
          <div className="badge badge-primary badge-lg flex items-center justify-start space-x-2">
            <FiClock />
            <span>{createdAt}</span>
          </div>
        </div>
        <p className="line-clamp-3">{description}</p>
        <div className="card-actions justify-between items-center">
          <button className="btn btn-ghost btn-md gap-2">
            <FiUsers size={24} />
            <span>{candidates}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
