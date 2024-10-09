import 'dotenv/config';
import app from './main';

require('dotenv').config();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started at http://localhost:${process.env.APP_PORT}`);
});
