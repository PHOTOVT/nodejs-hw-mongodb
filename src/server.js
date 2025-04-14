import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { getContacts, getContactsById } from './services/contacts.js';

export const setupServer = async () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors());
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const data = await getContactsById(contactId);

    if (!data) {
      return res.status(404).json({
        message: `Contact with id ${contactId} not found.`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found.' });
  });

  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server running on ${port} port.`));
};
