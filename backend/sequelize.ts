import { Sequelize } from 'sequelize-typescript';

export function db() {
  return new Sequelize({
    dialect: 'postgres',
    database: 'xrays',
    username: 'xrays',
    password: '123456',
    modelPaths: [__dirname + '/models']
  });
}