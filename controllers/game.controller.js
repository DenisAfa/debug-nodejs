const router = require('express').Router();
const { Game } = require('../db');

router.get('/all', (req, res) => {
  Game.findAll({ where: { ownerId: req.user.id } }).then(
    (data) => {
      res.status(200).json({
        games: data,
        message: 'Data fetched.',
      });
    },

    () => {
      res.status(500).json({
        message: 'Data not found',
      });
    }
  );
});

router.get('/:id', (req, res) => {
  Game.findOne({ where: { id: req.params.id, ownerId: req.user.id } }).then(
    (game) => {
      res.status(200).json({
        game: game,
      });
    },

    (err) => {
      res.status(500).json({
        message: 'Data not found.',
      });
    }
  );
});

router.post('/create', (req, res) => {
  Game.create({
    title: req.body.game.title,
    ownerId: req.user.id,
    studio: req.body.game.studio,
    esrbRating: req.body.game.esrbRating,
    userRating: req.body.game.userRating,
    havePlayed: req.body.game.havePlayed,
  }).then(
    (game) => {
      res.status(200).json({
        game: game,
        message: 'Game created.',
      });
    },

    (err) => {
      res.status(500).send(err.message);
    }
  );
});

router.put('/update/:id', (req, res) => {
  Game.update(
    {
      title: req.body.game.title,
      studio: req.body.game.studio,
      esrbRating: req.body.game.esrbRating,
      userRating: req.body.game.userRating,
      havePlayed: req.body.game.havePlayed,
    },
    {
      where: {
        id: req.params.id,
        ownerId: req.user.id,
      },
    }
  ).then(
    (game) => {
      res.status(200).json({
        game: game,
        message: 'Successfully updated.',
      });
    },

    (err) => {
      res.status(500).json({
        message: err.message,
      });
    }
  );
});

router.delete('/remove/:id', (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
      ownerId: req.user.id,
    },
  }).then(
    (game) => {
      res.status(200).json({
        game: game,
        message: 'Successfully deleted',
      });
    },

    (err) => {
      res.status(500).json({
        error: err.message,
      });
    }
  );
});

module.exports = router;
