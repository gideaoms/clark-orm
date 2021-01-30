import webApp from './utils/web-app';

export const { BaseModel, scope } = webApp.container.use('Adonis/Lucid/Orm');
export * from '@adonisjs/lucid/build/src/Orm/Decorators';
