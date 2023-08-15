import React from 'react';

interface RequestDetailsProps {
  userName: string;
  formattedDate: string;
  statement: string;
  status: string;
}

export const RequestDetails: React.FC<RequestDetailsProps> = ({
  userName,
  formattedDate,
  statement,
  status,
}) => (
  <>
    <p className="text-2xl">
      You requested {userName} for {statement} at{' '}
      <span className="font-semibold">{formattedDate}</span>
    </p>
    <p className="text-2xl">
      <span className="font-bold text-2xl">Status:</span> {status}
    </p>
  </>
);
