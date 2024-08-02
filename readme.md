[![npm version](https://img.shields.io/npm/v/clark-orm.svg?style=flat)](https://www.npmjs.com/package/clark-orm)

# ClarkORM

If you like this project, please give us a star on Github.

ClarkORM is a [Typescript](https://www.typescriptlang.org/) ORM built on top of [Lucid ORM](https://docs.adonisjs.com/guides/database/introduction) (AdonisJS).

## Why

[AdonisJS](https://adonisjs.com/) is a great framework and it has one of the best ORM. But it works only in its ecosystem. Using ClarkORM you can have all the benefits of Lucid, but in any Node.js project you want.

## How it works

ClarkORM is built on top of Lucid ORM and Lucid ORM is built on top of [knex](http://knexjs.org/). The idea of ClarkORM is let you manage your *migrations* and *seeds* with knex the way you already do. But when it comes to Models ClarkORM comes on scene.

## Installation

```sh
npm install clark-orm
npm install luxon
```

## Usage

Here you can configure your connection like [Adonis Lucid](https://docs.adonisjs.com/guides/database/introduction#drivers-config)
```ts
// database.ts
import { defineConfig } from "clark-orm";

export const { BaseModel, Event, Database } = defineConfig({
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

```ts
// models/city.ts
import { DateTime } from "luxon";
import { column } from "clark-orm";
import { BaseModel } from "../database";

export class CityModel extends BaseModel {
  public static table = "cities";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
```

You can learn more about the models [here](https://docs.adonisjs.com/guides/models/introduction).

## Extra

To use ClarkORM you need to know at least a little about [knex](http://knexjs.org/) and [Lucid](https://docs.adonisjs.com/guides/database/introduction)

Do you like to learn with examples? We have one [here](https://github.com/gideaoms/clark-orm/blob/main/example.md)
