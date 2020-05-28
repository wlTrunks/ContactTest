import * as Knex from "knex";

const config = require('../../knexfile');

const env = process.env.NODE_ENV || 'development';
const db: Knex = Knex(config.development);
export default db;




