const express = require('express');
const { sequelize } = require('./db');
const userRouter = require('./controllers/user.controller');
const gameRouter = require('./controllers/game.controller');
const PORT = 4000;

const app = express();

app.use(express.json());

sequelize.sync();

app.use('/api/auth', userRouter);
app.use(require('./middleware/validate-session'));
app.use('/api/game', gameRouter);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
