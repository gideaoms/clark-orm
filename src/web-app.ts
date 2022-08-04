import 'reflect-metadata';
import { join } from 'path';
import { Application } from '@adonisjs/application';
import { Registrar } from '@adonisjs/fold';
import { Config } from '@adonisjs/config';
import { Logger } from '@adonisjs/logger';
import { Profiler } from '@adonisjs/profiler';

const appRoot = __dirname;
const webApp = new Application(appRoot, 'web', {});
const registrar = new Registrar([webApp], appRoot);
const knexfile = require(join(appRoot, '..', '..', 'knexfile'));

webApp.container.singleton('Adonis/Core/Config', () => {
  const isSqliteConnection = knexfile.client === 'sqlite';
  const connection = isSqliteConnection
    ? {
        connection: {
          filename: knexfile.connections.sqlite.connection.filename,
        },
        useNullAsDefault: true,
        healthCheck: false,
      }
    : {
        connection: {
          ...knexfile.connection
        },
      };
  return new Config({
    database: {
      connection: knexfile.client,
      connections: {
        [knexfile.client]: {
          client: knexfile.client,
          ...connection,
        },
      },
    },
  });
});

webApp.container.singleton('Adonis/Core/Logger', () => {
  const config = webApp.container.use('Adonis/Core/Config').get('app.logger', {});
  return new Logger(config);
});

webApp.container.singleton('Adonis/Core/Profiler', () => {
  const config = webApp.container.use('Adonis/Core/Config').get('app.profiler', {});
  const logger = webApp.container.use('Adonis/Core/Logger');
  return new Profiler(appRoot, logger, config);
});

registrar.useProviders(['@adonisjs/events', '@adonisjs/lucid']).register();

export const useContainer = webApp.container.use.bind(webApp.container);
