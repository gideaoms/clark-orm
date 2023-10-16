1.
```sh
mkdir clark-orm-example && cd clark-orm-example
```
2.
```sh
npm init -y
```
3.
```sh
npm add clark-orm knex sqlite3 luxon
npm add -D typescript tsx
```
4. create a knexfile.ts in the root of your project
```js
module.exports = {
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123456",
    database: "postgres",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    extension: "ts",
    directory: "database/migrations",
  },
  seeds: {
    tableName: "knex_seeds",
    extension: "ts",
    directory: "database/seeds",
  },
};

```
5.
```sh
npx knex migrate:make -x ts --esm create-city
```
6. edit the migration you just created
```js
import { Knex } from 'knex';

export const up = (knex: Knex) => {
  return knex.schema.createTable('cities', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropTable('cities');
};
```
7.
```sh
npx knex migrate:latest
```
8. create a file named database.ts
```js
import { defineConfig } from "clark-orm";

export const { BaseModel } = defineConfig({
  connection: "pg",
  connections: {
    pg: {
      client: "pg",
      healthCheck: false,
      debug: false,
      connection: {
        host: '...',
        port: '...',
        user: '...',
        password: '...',
        database: '...',
      },
    },
  },
})
```

9. create a file named index.ts
```js
import { DateTime } from "luxon";
import { column } from "clark-orm";
import { BaseModel } from "./database";

export class CityModel extends BaseModel {
  public static table = "cities";

  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

const createdCity = await CityModel
  .create({ name: 'Any City Name' });
console.log(createdCity);
```
10.
```sh
npx tsx index.ts
```
