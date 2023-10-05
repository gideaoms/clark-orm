import { ioc } from './ioc';

export const { BaseModel, column } = ioc.use('Adonis/Lucid/Orm');
export * from '@adonisjs/lucid/build/src/Orm/Decorators';
