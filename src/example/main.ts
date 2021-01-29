import { CityModel } from './model';
import Database from '../adonisjs/lucid/database';

CityModel.all()
  .then((cities) => {
    console.log(cities.map((city) => city.toJSON()));
    Database.manager.closeAll();
  })
  .catch(console.error);
