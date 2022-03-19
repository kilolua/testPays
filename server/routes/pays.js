const express = require('express');
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the pays.
recordRoutes.route('/pays').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('pays')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new pay.
recordRoutes.route('/pays/addPay').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    CardNumber: req.body.CardNumber,
    ExpDate: req.body.ExpDate,
    Cvv: req.body.Cvv,
    Amount: req.body.Amount,
  };

  dbConnect
    .collection('pays')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting pay!');
      } else {
        console.log(`Added a new pay with id ${result.insertedId}`);
        res.send({RequestId:result.insertedId, Amount:req.body.Amount});
      }
    });
});

module.exports = recordRoutes;
