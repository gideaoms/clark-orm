[![npm version](https://img.shields.io/npm/v/clark-orm.svg?style=flat)](https://www.npmjs.com/package/clark-orm)

# ClarkORM

If you like this project, please give us a star on Github.

ClarkORM is a [Typescript](https://www.typescriptlang.org/) ORM built on top of [Lucid ORM](https://preview.adonisjs.com/guides/database/introduction) (AdonisJS).

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

```ts
import { DateTime } from "luxon";
import { BaseModel, column } from "clark-orm/Orm";

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

Lucid has a lot of options, but what do you can do using ClarkORM? We offer some things that you can use like you would use with Lucid:
```js
clark-orm/Orm
clark-orm/Database
clark-orm/Factory
clark-orm/Event
```

You can learn more about the models [here](https://preview.adonisjs.com/guides/models/introduction).

*We use the knexfile.ts in the root of your project because Lucid ORM is built on top of knex*
```ts
import { defineConfig } from 'clark-orm';

export default defineConfig({
  connection: 'sqlite',
  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: './db.sqlite',
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
    },
  },
});
```

## Extra

To use ClarkORM you need to know at least a little about [knex](http://knexjs.org/) and [Lucid](https://preview.adonisjs.com/guides/models/introduction)

Do you like to learn with examples? We have one [here](https://github.com/gideaoms/clark-orm/blob/main/example.md)
