import { Router } from 'express';
import { Todo } from '../models/todo.model';

const router = Router();

router.route('/:id').get((req, res) => {

  const id = req.params.id;

  Todo.findById(id)
    .then((doc) => res.json(doc))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {

  Todo.find()
    .then((doc) => res.json(doc))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const title = req.body.title;
  const description = req.body.description;
  const timestamp = req.body.timestamp;

  const newTodo = new Todo({ title, description, timestamp });

  newTodo.save()
    .then(() => res.json('Todo added !'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/remove').post((req, res) => {

  const id = req.body.id;

  Todo.findByIdAndDelete(id)
    .then(() => res.json('Todo deleted !'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {

  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const timestamp = req.body.timestamp;

  const newTodo = { title, description, timestamp };

  Todo.findByIdAndUpdate(id, newTodo)
    .then(() => res.json('Todo updated !'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

export { router as todoRouter }
