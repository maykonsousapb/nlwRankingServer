import "reflect-metadata";

import express from 'express';
import cors from 'cors';
import "./shared/tsyringe/container"
import { routes } from './routes';

const app = express();
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!');
});
