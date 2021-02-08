import { useContainer } from './web-app';

export const { BaseModel, scope } = useContainer('Adonis/Lucid/Orm');
export * from '@adonisjs/lucid/build/src/Orm/Decorators';
