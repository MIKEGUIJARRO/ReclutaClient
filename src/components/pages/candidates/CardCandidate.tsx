import React, { FC } from 'react';
import { FiClipboard, FiClock, FiEdit, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export interface CardCandidate {
  id: string;
  firstName: string;
  middleName: string;
  lastName: number | string;
  createdAt: string;
}

export const CardCandidate: FC<CardCandidate> = ({
  id,
  firstName,
  lastName,
  middleName,
  createdAt,
}) => {
  return (
    <div className="card w-full h-full bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Link className="link link-hover" to={`/home/candidates/${id}`}>
              <h2 className="card-title line-clamp-">
                {firstName + ' ' + lastName}
              </h2>
            </Link>
            <Link
              to={`/home/candidates/update/${id}`}
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
        <div className="card-actions justify-between items-center">
          <button className="btn btn-ghost btn-md gap-2">
            <FiClipboard size={24} />
            <span>{0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
