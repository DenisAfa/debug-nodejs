const express = require('express');
const { sequelize } = require('./db');
const userRouter = require('./controllers/user.controller');
const gameRouter = require('./controllers/game.controller');

const app = express();

app.use(express.json());

sequelize.sync();

app.use('/api/auth', userRouter);
app.use(require('./middleware/validate-session'));
app.use('/api/game', gameRouter);

app.listen(() => {
  console.log('App is listening on 4000');
});
