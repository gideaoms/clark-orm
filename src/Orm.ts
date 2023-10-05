import { useContainer } from './ioc';

export const { BaseModel, column } = useContainer('Adonis/Lucid/Orm');
export * from '@adonisjs/lucid/build/src/Orm/Decorators';
