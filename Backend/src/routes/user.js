const express = require('express');
const router = express.Router();


router.get('/c', function (req, res) {res.send('alo')})

module.exports = router;