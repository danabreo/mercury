import React from 'react';

export enum MailingListStatus {
  DRAFT = 'Ready to create new mailing list :)',
  CREATING = 'Creating... please hold',
  SUCCEDED = 'Mailing list created!',
  FAILED = 'Failed to create mailing list :(',
}

export default function MailingListStatusIndicator({
  currMailingListStatus,
}: {
  currMailingListStatus: MailingListStatus;
}): JSX.Element {
  return <div>{currMailingListStatus}</div>;
}
