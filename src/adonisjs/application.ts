import { Application } from '@adonisjs/application';
import { Registrar } from '@adonisjs/fold';
import { Config } from '@adonisjs/config';
import { Logger } from '@adonisjs/logger';
import { Profiler } from '@adonisjs/profiler';

const ROOT = '../../';

const application = new Application(ROOT, 'web');
const registrar = new Registrar([application], ROOT);

registrar.useProviders(['@adonisjs/events', '@adonisjs/lucid']).register();

application.container.singleton('Adonis/Core/Config', () => {
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

application.container.singleton('Adonis/Core/Logger', () => {
  const config = application.container.use('Adonis/Core/Config').get('app.logger', {});
  return new Logger(config);
});

application.container.singleton('Adonis/Core/Profiler', () => {
  const config = application.container.use('Adonis/Core/Config').get('app.profiler', {});
  const logger = application.container.use('Adonis/Core/Logger');
  return new Profiler(ROOT, logger, config);
});

export default application;
