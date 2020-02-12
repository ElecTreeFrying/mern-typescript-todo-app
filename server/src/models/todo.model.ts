import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String },
  description: { type: String },
  timestamp: { type: String, default: Date.now()  }
});

export const Todo = mongoose.model('Todo', todoSchema);
