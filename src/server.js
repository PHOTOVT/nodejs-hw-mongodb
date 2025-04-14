import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from '../utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found.' });
  });

  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server running on ${port} port.`));
};

setupServer();
