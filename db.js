const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: '5433',
  }
);

const User = require('./models/user')(sequelize, Sequelize);
const Game = require('./models/game')(sequelize, Sequelize);

sequelize.authenticate().then(
  () => {
    console.log('Connected to DB');
  },

  (err) => {
    console.log(`Error: ${err}`);
  }
);

module.exports = { sequelize, User, Game };
