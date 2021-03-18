import React from 'react';
import { Formik, Field, Form } from 'formik';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function SendEmail(): JSX.Element {
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
        onSubmit={async (values) => {
          const res = await fetch('/api/messages/send', {
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          const result = await res.json();
          console.log(result);
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

      <Link href="/">
        <a>Go back home</a>
      </Link>
    </main>
  );
}
