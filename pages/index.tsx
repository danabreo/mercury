import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to mercury!</h1>
        <Link href="/messages/send">
          <a>Send an email</a>
        </Link>
        <Link href="/mailinglists">
          <a>Manage mailing lists</a>
        </Link>
      </main>
    </div>
  );
}
