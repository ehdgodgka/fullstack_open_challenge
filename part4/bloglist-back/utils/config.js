const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, `../config/.env`)
});
let MONGO_URL = process.env.DB_URI;
if (process.env.NODE_ENV === 'test') {
  MONGO_URL = process.env.TEST_DB_URI;
}
const PORT = process.env.PORT || 3003;
const NODE_ENV = process.env.NODE_ENV;

module.exports = { MONGO_URL, PORT, NODE_ENV };
