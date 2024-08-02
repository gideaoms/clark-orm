import { Emitter } from '@adonisjs/events'
import { Database } from '@adonisjs/lucid/database'
import { BaseModel } from '@adonisjs/lucid/orm'
import { Logger } from "@adonisjs/logger"
import { Application } from '@adonisjs/application'
import { Adapter } from '../node_modules/@adonisjs/lucid/build/src/orm/adapter/index.js'
import { type DatabaseConfig } from '@adonisjs/lucid/types/database'
import { LucidModel } from '@adonisjs/lucid/types/model'

const logger = new Logger({
  name: 'app-name',
  enabled: true,
  level: 'info',
});
const application = new Application(
  new URL('./', import.meta.url),
  { environment: 'web' }
);
const emitter = new Emitter(application);

export function defineConfig(config: DatabaseConfig) {
  const database = new Database(config, logger, emitter);
  BaseModel.$adapter = new Adapter(database);
  return {
    Database: database,
    Event: emitter,
    BaseModel: BaseModel as LucidModel,
  };
}
