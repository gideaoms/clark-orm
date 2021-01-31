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
npm add clark-orm reflect-metadata knex pg luxon
npm add -D typescript ts-node
```
4. create a knexfile.ts in the root of your project
```js
import path from "path";

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
npx knex make:migrate create-city
```
6. edit the migration you just created
```js
import * as Knex from 'knex';

export const up = (knex: Knex) => {
  return knex.schema.createTable('cities', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = (knex: Knex) => {
  return knex.schema.dropSchema('cities');
};
```
7.
```sh
npx knex migrate:latest
```
8. created a file name index.ts
```js
import "reflect-metadata";
import { DateTime } from "luxon";
import { BaseModel, column } from "clark-orm/Orm";

export class CityModel extends BaseModel {
  public static table = "cities";

  @column({ isPrimary: true, serializeAs: null })
  public id!: number;

  @column()
  public name!: string;

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime;
}

const main = async () => {
  const createdCity = await CityModel.create({
    name: 'Any City Name'
  });
  console.log(createdCity);
}

main();
```
9.
```sh
npx ts-node -T index.ts
```
