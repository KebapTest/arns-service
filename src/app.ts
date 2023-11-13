/**
 * Copyright (C) 2022-2023 Permanent Data Solutions, Inc. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import Koa from 'koa';
import router from './router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import {
  arweaveMiddleware,
  loggerMiddleware,
  warpMiddleware,
  headersMiddleware,
  errorMiddleware,
} from './middleware';
import * as promClient from 'prom-client';
import logger from './logger';

const app = new Koa();

// attach middlewares
app.use(loggerMiddleware);
app.use(errorMiddleware);
app.use(arweaveMiddleware);
app.use(warpMiddleware);
app.use(headersMiddleware);
app.use(cors());
app.use(bodyParser());
app.use(router.routes());

// prometheus metric for errors
const errorCounter = new promClient.Counter({
  name: 'errors_total',
  help: 'Total error count',
});

// catch any floating errors, swallow them and increment prometheus counter
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception!', err);
  errorCounter.inc();
});

const serverConfigs = {
  port: +(process.env.PORT || 3000),
  keepAliveTimeout: 120_000, // two minute timeout for connections
  requestTimeout: 120_000, // two minute timeout for requests
};

app.listen(serverConfigs, () => {
  logger.info('Server is listening...', serverConfigs);
});
