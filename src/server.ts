import express from 'express';
import 'dotenv/config';
import { InMemoryCounter } from './InMemoryCounter';    
import os from 'node:os';

const app = express();
const port = process.env.PING_LISTEN_PORT || 3000;
let countRequest = 0;
const counter = new InMemoryCounter();

app.use((req, res, next) => {
  counter.increment();
  next();
});

app.get('/ping', (req, res) => {
    countRequest++;
  console.log(`/ping handled by hostname: ${os.hostname()}`);
    if (req.headers) {
        return res.send(`Header is: ${JSON.stringify(req.headers)}`);
    } else {
        return res.send('No headers found in the request.');
    }
});

app.get('/stats', (req, res) => {
    res.json({
    totalRequests: counter.getCount(),
    uptimeSeconds: process.uptime(),
    instanceId: process.env.INSTANCE_ID || 'instance',
  });
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});