/// <reference types="@adonisjs/lucid" />

import 'reflect-metadata';
// import path from 'node:path';
import { Ioc } from '@adonisjs/fold';
import { Config } from '@adonisjs/config';
import { Logger } from '@adonisjs/logger';
import { Profiler } from '@adonisjs/profiler';
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database';
import type { LoggerConfig } from '@ioc:Adonis/Core/Logger';
import type { ProfilerConfig } from '@ioc:Adonis/Core/Profiler';

const appRoot = __dirname;
const ioc = new Ioc();
// const knexfile = require(path.join(appRoot, '..', '..', 'knexfile'));

ioc.singleton('Adonis/Core/Config', function () {
  const database: DatabaseConfig = {
    connection: 'sqlite',
    connections: {
      sqlite: {
        client: 'sqlite',
        connection: {
          filename: './db.sqlite',
        },
        useNullAsDefault: true,
        healthCheck: false,
        debug: false,
      },
    },
  };
  const profiler: ProfilerConfig = {
    enabled: true,
    blacklist: [],
    whitelist: [],
  };
  const logger: LoggerConfig = {
    name: 'testing-orm',
    enabled: true,
    level: 'info',
    prettyPrint: true,
  };
  return new Config({ database, profiler, logger });
});

ioc.singleton('Adonis/Core/Logger', function () {
  const logger = ioc.resolveBinding('Adonis/Core/Config').get('logger', {});
  return new Logger(logger);
});

ioc.singleton('Adonis/Core/Profiler', function () {
  const profiler = ioc.resolveBinding('Adonis/Core/Config').get('profiler', {});
  const logger = ioc.resolveBinding('Adonis/Core/Logger');
  return new Profiler(appRoot, logger, profiler);
});

ioc.singleton('Adonis/Core/Event', function () {
  const { Emitter } = require('@adonisjs/events/build/src/Emitter');
  return new Emitter();
});

ioc.singleton('Adonis/Lucid/Database', function () {
  const database = ioc.resolveBinding('Adonis/Core/Config').get('database', {});
  const logger = ioc.resolveBinding('Adonis/Core/Logger');
  const profiler = ioc.resolveBinding('Adonis/Core/Profiler');
  const emitter = ioc.resolveBinding('Adonis/Core/Event');
  const { Database } = require('@adonisjs/lucid/build/src/Database');
  return new Database(database, logger, profiler, emitter);
});

ioc.singleton('Adonis/Lucid/Orm', function () {
  const { Adapter } = require('@adonisjs/lucid/build/src/Orm/Adapter');
  const { BaseModel } = require('@adonisjs/lucid/build/src/Orm/BaseModel');
  const { scope } = require('@adonisjs/lucid/build/src/Helpers/scope');
  const decorators = require('@adonisjs/lucid/build/src/Orm/Decorators');
  const { ModelPaginator } = require('@adonisjs/lucid/build/src/Orm/Paginator');
  const { SnakeCaseNamingStrategy } = require('@adonisjs/lucid/build/src/Orm/NamingStrategies/SnakeCase');
  const database = ioc.resolveBinding('Adonis/Lucid/Database');
  BaseModel.$adapter = new Adapter(database);
  BaseModel.$container = ioc;
  return {
    BaseModel,
    ModelPaginator,
    SnakeCaseNamingStrategy,
    scope,
    ...decorators,
  };
});

ioc.singleton('Adonis/Lucid/Factory', function () {
  const { FactoryManager } = require('@adonisjs/lucid/build/src/Factory');
  return new FactoryManager();
});

export const useContainer = ioc.use.bind(ioc);
