import { DateTime } from 'luxon';
import { BaseModel, column } from '../adonisjs/lucid/orm';

export class CityModel extends BaseModel {
  public static table = 'cities';

  @column({ isPrimary: true, serializeAs: null })
  public id!: number;

  @column()
  public name!: string;

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime;
}
