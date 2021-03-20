import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import fetch from '../../libs/fetch';

export default function MailingLists(): JSX.Element {
  const { data, error } = useSWR<{
    items: Array<{
      name: string;
      address: string;
      description: string;
      members_count: number;
    }>;
  }>('/api/mailinglists', fetch);

  if (error)
    return <div>failed to load mailing lists... check the API key</div>;
  if (!data) return <div>loading mailing lists...</div>;

  return (
    <main className={styles.main}>
      <h1>Existing mailing lists</h1>

      <div>
        {data.items.map((item) => (
          <div key={item.address}>
            <div>Name: {item.name}</div>
            <div>Address: {item.address}</div>
            <div>Description: {item.description}</div>
            <div>Member Count: {item.members_count}</div>
          </div>
        ))}
      </div>
      <Link href="/mailinglists/add">
        <a>Create a mailing list</a>
      </Link>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </main>
  );
}
