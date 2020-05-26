const path = require('path');
require('dotenv').config({ path: path.join(__dirname, `../config/${process.env.ENVIRONMENT}.env`) });

const MONGO_URL = process.env.DB_URI;
const PORT = process.env.PORT || 3003;

module.exports = { MONGO_URL, PORT };
