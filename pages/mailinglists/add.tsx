import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import MailingListStatusIndicator, { MailingListStatus } from './indicator';

export default function AddList(): JSX.Element {
  const [currMailingListStatus, setCurrMailingListStatus] = useState(
    MailingListStatus.DRAFT,
  );
  return (
    <main className={styles.main}>
      <h1>Create a mailing list</h1>

      <Formik
        initialValues={{
          address: '',
          name: '',
          description: '',
        }}
        onSubmit={async (values, actions) => {
          setCurrMailingListStatus(MailingListStatus.CREATING);
          const res = await fetch('/api/mailinglists/add', {
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          if (res.status == 200) {
            setCurrMailingListStatus(MailingListStatus.SUCCEDED);
            setTimeout(() => {
              actions.resetForm();
              setCurrMailingListStatus(MailingListStatus.DRAFT);
            }, 5000);
          } else {
            setCurrMailingListStatus(MailingListStatus.FAILED);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="address">Address</label>
              <Field name="address" placeholder="mailing_list_name" />
            </div>

            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" placeholder="Mailing List Name" />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                placeholder="Purpose of this mailing list"
              />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div>
        <MailingListStatusIndicator
          currMailingListStatus={currMailingListStatus}
        />
      </div>

      <Link href="/mailinglists">
        <a>Manage mailing lists</a>
      </Link>

      <Link href="/">
        <a>Go back home</a>
      </Link>
    </main>
  );
}
