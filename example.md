1.
```sh
mkdir clark-orm-example && cd clark-orm-example
```
2. You should change your package.json to ```"type": "module"``` since it aims to work with ESM
```sh
npm init -y
```
3.
```sh
npm add clark-orm knex sqlite3 luxon @adonisjs/lucid
npm add -D typescript tsx @tsconfig/node20 @types/luxon
```
4. create a knexfile.ts in the root of your project
```js
export default {
  client: "sqlite3",
  useNullAsDefault: false,
  connection: {
    filename: './db.sqlite',
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
npx tsx node_modules/knex/bin/cli.js migrate:make city
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
npx tsx node_modules/knex/bin/cli.js migrate:latest
```
8. create a file named database.ts
```js
// src/database.ts
import { defineConfig } from "clark-orm";

export const { BaseModel } = defineConfig({
  connection: "sqlite",
  connections: {
    sqlite: {
      client: "sqlite",
      debug: false,
      useNullAsDefault: true,
      connection: {
        filename: "./db.sqlite",
      },
    },
  },
})
```

9. create a file
```js
// src/city.ts
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
```
10. Create a new file
```ts
// main.ts
import { Database } from './database.js'
import { CityModel } from './city.js'

const city = await CityModel.create({ name: 'City 1' });
console.log(city.id, city.name);

await Database.manager.closeAll();
```
11. Run
```sh
npx tsx src/main.ts
```
