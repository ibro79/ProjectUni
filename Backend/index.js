import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import RoutaInvent from './Routy/RoutaInvent.js';
import RoutaInvent2 from './Routy/RoutaInvent2.js';
import Allinvent from './Routy/Allinvent.js';
import cors from 'cors';


const app = express();

app.use (express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Invent Backend Sytem is running!');
});

app.use("/inventory", RoutaInvent);
app.use("/inventory2", RoutaInvent2);
app.use("/allinventory", Allinvent);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error); 
  });