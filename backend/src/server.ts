import 'dotenv/config';
import app from './main';

require('dotenv').config();

app.listen(Number(process.env.APP_PORT), '0.0.0.0', () => {
  console.log(`Server started at http://localhost:${process.env.APP_PORT}`);
});
