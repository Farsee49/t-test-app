
const express = require('express');
const sessRouter = express.Router();
const { getSessionById } = require('../db/adapters/sess');

sessRouter.get('/session-data', async (req, res) => {
    console.log('Fetching session data for session ID:', req.sessionID);
  const sid = req.sessionID;

  try {
    const session = await getSessionById(sid);
    res.json({ session });
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve session' });
  }
});



module.exports = sessRouter;