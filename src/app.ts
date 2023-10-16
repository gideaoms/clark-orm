import { Logger } from '@adonisjs/logger';
import { Profiler } from '@adonisjs/profiler';
import { Ioc } from '@adonisjs/fold';
import { Emitter } from '@adonisjs/events/build/src/Emitter/index.js';
import { Database } from '@adonisjs/lucid/build/src/Database/index.js';
import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel/index.js';
import { Adapter } from '@adonisjs/lucid/build/src/Orm/Adapter/index.js';
import { ModelPaginator } from '@adonisjs/lucid/build/src/Orm/Paginator/index.js';
import { SnakeCaseNamingStrategy } from '@adonisjs/lucid/build/src/Orm/NamingStrategies/SnakeCase.js';
import { scope } from '@adonisjs/lucid/build/src/Helpers/scope.js';
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database';
import type { LucidModel } from '@ioc:Adonis/Lucid/Orm';

const appRoot = '';
const logger = new Logger({
  name: 'app-name',
  enabled: true,
  level: 'info',
  prettyPrint: true,
});
const profiler = new Profiler(appRoot, logger, {
  enabled: true,
  blacklist: [],
  whitelist: [],
});
const emitter = new Emitter();
const ioc = new Ioc();

export function defineConfig(config: DatabaseConfig) {
  const database = new Database(config, logger, profiler, emitter);
  BaseModel.$adapter = new Adapter(database);
  BaseModel.$container = ioc;
  return {
    Database: database,
    BaseModel: BaseModel as LucidModel,
    Event: emitter,
  };
}

export * from '@adonisjs/lucid/build/src/Orm/Decorators/index.js';
export { ModelPaginator, SnakeCaseNamingStrategy, scope };
