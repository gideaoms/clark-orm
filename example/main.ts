import { DateTime } from 'luxon';
import { BaseModel, column } from '../src/Orm';
import Database from '../src/Database';

class UserModel extends BaseModel {
  public static table = 'users';

  @column({ isPrimary: true })
  public id: string;

  @column()
  name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

UserModel.all()
  .then((users) => {
    console.log(users);
  })
  .finally(() => {
    Database.manager.closeAll();
  });
