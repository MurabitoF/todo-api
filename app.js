const connect = require('./config/mongoDb');
const createServer = require('./utils/server');
require('dotenv').config();

const app = createServer();

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await connect();
});
