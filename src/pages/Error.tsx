import React from 'react';
import { useRouteError } from 'react-router-dom';

type RouteError = {
  statusText: string;
  message: string;
};

export const Error = () => {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
