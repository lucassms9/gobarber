import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import path from 'path';
import cors from 'cors';
import routes from './routes';
import './database';
import sentryConfig from './config/sentry';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    // The error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    if (process.env.NODE_ENV === 'development') {
      this.server.use(async (err, req, res, next) => {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      });
    }
    return this.server.use((req, res) => {
      res.status(500).json({ error: 'Internel Server Error' });
    });
  }
}

export default new App().server;
