const client = require('../client');

async function getSessionById(sid) {
  const query = 'SELECT sess FROM session WHERE sid = $1 AND expire > NOW()';
  const values = [sid];

  try {
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0].sess; // this is a JSON object
  } catch (err) {
    console.error('Error fetching session:', err);
    throw err;
  }
}











module.exports = {
  getSessionById,
};