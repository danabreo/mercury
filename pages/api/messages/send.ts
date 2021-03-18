import type { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from 'mailgun-js';
import type { Error as mailgunError, messages } from 'mailgun-js';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<mailgunError | messages.SendResponse>,
): Promise<void> => {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    throw new Error('MAILGUN_API_KEY or MAILGUN_DOMAIN are not defined in .env.development.local');
  }
  const mailgun = Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
  return new Promise(() => {
    mailgun.messages().send(req.body, (sendError: mailgunError, body: messages.SendResponse) => {
      if (sendError) {
        res.status(500).json(sendError);
      } else {
        res.status(200).json(body);
      }
    });
  });
};
