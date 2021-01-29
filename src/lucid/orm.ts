import application from '../adonisjs/application';

export const { BaseModel, scope } = application.container.use('Adonis/Lucid/Orm');
export * from '@adonisjs/lucid/build/src/Orm/Decorators';
