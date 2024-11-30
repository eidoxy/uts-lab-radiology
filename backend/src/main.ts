import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './routes';

const app = express();

const allowedOrigins = [
  'http://localhost:4173',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:8083',
  'http://localhost:8084',
  'http://103.101.225.18:8080',
  'http://103.101.225.18:8081',
  'http://103.101.225.18:8082',
  'http://103.101.225.18:8083',
  'http://103.101.225.18:8084',
  'http://103.101.225.18:3000',
  'https://wabw.chasterise.fun',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api', router);

export default app;
