import * as dotenv from 'dotenv';
dotenv.config();
import '@yak-twitter-app/server/db';
import { app } from '@yak-twitter-app/server/app';

const port = process.env.PORT || 3333;

const server = app.listen(port, () =>
  console.log(`server is running on http://localhost:${port}/api`)
);
server.on('error', console.error);
