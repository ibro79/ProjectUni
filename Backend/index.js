import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import RoutaInvent2 from './Routy/RoutaInvent2.js';
import RoutaShops from './Routy/RoutaShops.js';
import RoutaCategory from './Routy/RoutaCategory.js';
import cors from 'cors';

const app = express();

app.use (express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Invent Backend Sytem is running!');
});

app.use("/inventory", RoutaInvent2);
app.use("/shops", RoutaShops);
app.use("/category", RoutaCategory);
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