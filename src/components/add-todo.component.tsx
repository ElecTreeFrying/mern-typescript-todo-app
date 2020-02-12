import React, { Component, Props, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { IAddTodoState } from './interfaces/states';
import './../styles/add-todo.scss';


export default class AddTodo extends Component<Props<any>, IAddTodoState> {

  constructor(props: Props<any>) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.state = {
      title: '',
      description: ''
    }
  }

  addTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios.post('http://localhost:8081/todo-list/add', this.state)
      .then(() => console.log('Todo Added !'))
      .catch((error) => console.log(error));

    this.setState({ title: '', description: '' })
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value })
  }

  onChangeDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ description: e.target.value })
  }

  render() {
    return (
      <div>

        <h3 className="mb-4">Add Task</h3>

        <form onSubmit={this.addTodo}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
          </div>
          <div className="form-group">
            <label>Details</label>
            <textarea
              placeholder="What do you want to do?"
              rows={4}
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
          </div>

          <button type="submit" className="btn btn-success w-100">POST</button>
        </form>

      </div>

    )
  }

}
