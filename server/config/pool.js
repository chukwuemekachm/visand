/**
 * @fileOverview Contains the database pool configuration shared across repositories
 *
 * @author Chima Chukwuemeka
 *
 * @requires NPM:dotenv:config
 * @requires NPM:mysql2
 * @requires server/config/database.js:pool
*/

import 'dotenv/config';
import mysql from 'mysql2';

import databaseConfigs from './database';

const { NODE_ENV = 'development' } = process.env;
const pool = mysql.createPool({
  ...databaseConfigs[NODE_ENV],
  waitForConnections: true,
  connectionLimit: 8,
  queueLimit: 0,
});

export default pool.promise();
