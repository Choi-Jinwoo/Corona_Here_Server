import 'dotenv/config';
import app from './app';
import * as database from './database';

const { PORT } = process.env;

database.getConnection();

app.listen(PORT || 8080, () => {
  console.log(`server is listening to ${PORT}`);
});
