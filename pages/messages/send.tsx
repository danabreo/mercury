import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import EmailStatusIndicator, { EmailStatus } from './indicator';

export default function SendEmail(): JSX.Element {
  const [currEmailStatus, setCurrEmailStatus] = useState(EmailStatus.DRAFT);
  return (
    <main className={styles.main}>
      <h1>Send an email</h1>

      <Formik
        initialValues={{
          to: '',
          from: '',
          subject: '',
          text: '',
        }}
        onSubmit={async (values, actions) => {
          setCurrEmailStatus(EmailStatus.SENDING);
          const res = await fetch('/api/messages/send', {
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          if (res.status == 200) {
            setCurrEmailStatus(EmailStatus.QUEUED);
            setTimeout(() => {
              actions.resetForm();
              setCurrEmailStatus(EmailStatus.DRAFT);
            }, 5000);
          } else {
            setCurrEmailStatus(EmailStatus.FAILED);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="to">To</label>
              <Field name="to" placeholder="jane@email.com" />
            </div>

            <div>
              <label htmlFor="from">From</label>
              <Field name="from" placeholder="john@email.com" />
            </div>

            <div>
              <label htmlFor="subject">Subject</label>
              <Field name="subject" placeholder="hi" />
            </div>

            <div>
              <label htmlFor="text">Text</label>
              <Field name="text" placeholder="test" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div>
        <EmailStatusIndicator currEmailStatus={currEmailStatus} />
      </div>

      <Link href="/">
        <a>Go back home</a>
      </Link>
    </main>
  );
}
