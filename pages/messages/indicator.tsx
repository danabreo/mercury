import React from 'react';

export enum EmailStatus {
  DRAFT = 'Ready to send :)',
  SENDING = 'Sending...',
  QUEUED = 'Message sent!',
  FAILED = 'Failed to send :(',
}

export default function EmailStatusIndicator({
  currEmailStatus,
}: {
  currEmailStatus: EmailStatus;
}): JSX.Element {
  return <div>{currEmailStatus}</div>;
}
