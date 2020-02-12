import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { todoRouter } from './routes/todo';

dotenv.config();
const app = express();
const port = +process.env.PORT || 8082;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("\nMongoDB database connection established successfully\n");
});

app.use('/todo-list', todoRouter);

app.listen(port, () => console.log(`\nListening on port ${port}!`))
