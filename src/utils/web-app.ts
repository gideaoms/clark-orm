import 'reflect-metadata';
// import { resolve } from 'path';
import { Application } from '@adonisjs/application';
import { Registrar } from '@adonisjs/fold';
import { Config } from '@adonisjs/config';
import { Logger } from '@adonisjs/logger';
import { Profiler } from '@adonisjs/profiler';

// const appRoot = resolve(__dirname, '..', '..', '..');
const appRoot = process.cwd();
const webApp = new Application(appRoot, 'web', {
  namespaces: {
    models: 'Models',
  },
  aliases: {
    // Models: MODELS,
  },
  directories: {
    // database: DATABASE,
    // migrations: MIGRATIONS,
    // seeds: SEEDERS,
  },
});
const registrar = new Registrar([webApp], appRoot);

registrar.useProviders(['@adonisjs/events', '@adonisjs/lucid']).register();

webApp.container.singleton('Adonis/Core/Config', () => {
  return new Config({
    database: {
      connection: 'pg',
      connections: {
        pg: {
          client: 'pg',
          connection: {
            host: '127.0.0.1',
            port: 8090,
            user: 'postgres',
            password: '123456',
            database: 'lucid',
          },
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

export default webApp;
