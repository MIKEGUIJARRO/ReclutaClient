import React, { FC, ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

export const Scaffold: FC<Props> = ({ children }) => {
  return <div className="max-w-6xl m-auto">{children}</div>;
};
