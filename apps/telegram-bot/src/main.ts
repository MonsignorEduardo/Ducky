import express from 'express';

import {DuckyBot} from './Bot';

const myBot = new DuckyBot();
myBot.setCommands();
myBot.start();

const app = express();
const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
});

app.listen(port, () => {
  console.log(`Web server started at ${port}`);
});
