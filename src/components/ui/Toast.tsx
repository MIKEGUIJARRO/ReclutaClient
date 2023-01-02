import React, { FC } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

interface Toast {
  successMessage?: string | null;
  errorMessage?: string | null;
  warningMessage?: string | null;
  infoMessage?: string | null;
}

interface GenericAlert {
  message: string;
}

const size = 24;

const SuccessAlert: FC<GenericAlert> = ({ message }) => {
  return (
    <div className="alert alert-success shadow-lg">
      <div>
        <FiCheckCircle size={size} />
        <span>{message}</span>
      </div>
    </div>
  );
};

const ErrorAlert: FC<GenericAlert> = ({ message }) => {
  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <FiXCircle size={size} />
        <span>{message}</span>
      </div>
    </div>
  );
};

const WarningAlert: FC<GenericAlert> = ({ message }) => {
  return (
    <div className="alert alert-warning shadow-lg">
      <div>
        <FiAlertCircle size={size} />
        <span>{message}</span>
      </div>
    </div>
  );
};

const InfoAlert: FC<GenericAlert> = ({ message }) => {
  return (
    <div className="alert alert-info shadow-lg">
      <div>
        <FiInfo size={size} />
        <span>{message}</span>
      </div>
    </div>
  );
};

export const Toast: FC<Toast> = ({
  successMessage,
  errorMessage,
  warningMessage,
  infoMessage,
}) => {
  return (
    <div className="toast toast-end">
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {warningMessage && <WarningAlert message={warningMessage} />}
      {infoMessage && <InfoAlert message={infoMessage} />}
    </div>
  );
};
