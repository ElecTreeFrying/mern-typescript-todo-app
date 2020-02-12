import React, { Component, Props, MouseEvent, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { IDisplayTodoState, ITodoList } from './interfaces/states';
import './../styles/display-todo.scss';


export default class DisplayTodo extends Component<Props<any>, IDisplayTodoState> {

  constructor(props: Props<any>) {
    super(props);

    this.refreshList = this.refreshList.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.state = {
      list: [],
      _id: '',
      title: '',
      description: '',
      timestamp: '',
      isShow: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8081/todo-list')
      .then((res) => {
        let list: ITodoList[] = res.data;

        list = list.map((todo: ITodoList) => {
          todo['timestamp'] = moment(Number(todo.timestamp)).fromNow();
          return todo;
        })

        this.setState({ list });
      })
      .catch((error) => console.log(error));
  }

  refreshList(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    this.componentDidMount();
  }

  updateTodo(e: any) {
    this.setState({ timestamp: Date.now().toString(), isShow: true })
    axios.get('http://localhost:8081/todo-list/' + e)
      .then((res) => {
        const { _id, title, description } = res.data;
        this.setState({ _id, title, description });
      })
      .catch((error) => console.log(error));
  }

  deleteTodo(e: any) {
    axios.post('http://localhost:8081/todo-list/remove', { id: e })
      .then(() => {
        console.log('Todo deleted !');
        this.componentDidMount();
      })
      .catch((error) => console.log(error));

  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value })
  }

  onChangeDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ description: e.target.value })
  }

  editTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(moment().fromNow());

    console.log(this.state.timestamp);

    const id = this.state._id;

    axios.post('http://localhost:8081/todo-list/update/' + id, this.state)
      .then(() => {
        console.log('Todo Updated !');
        this.componentDidMount();
      })
      .catch((error) => console.log(error));

    this.setState({ title: '', description: '', timestamp: '', isShow: false })
  }

  render() {
    return (
      <div className="">
        <button type="button" className="btn btn-primary mb-4" onClick={this.refreshList}>Refresh List</button>

        <div className="row" style={!this.state.isShow ? {display: 'none'} : {}}>
          <div className="col">

          <h5 className="mb-4">Update Task</h5>

            <form onSubmit={this.editTodo}>
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
                  rows={4}
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
              </div>

              <button type="submit" className="btn btn-success w-100 mb-5">UPDATE</button>
            </form>

          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="list-group mb-5">
              {this.state.list.map((item: ITodoList, index?: number) => {
                return (
                  <div key={item._id}>
                    <a href="#" className="list-group-item list-group-item-action xdisabled">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{item.title}</h5>
                        <small>{item.timestamp}</small>
                      </div>
                      <p className="mb-1">{item.description}</p>
                      <small>Added by you.</small>
                    </a>
                    <div className="d-flex btn-container">
                      <div className="ml-auto">
                        <button type="button" className="btn-icon0 btn btn-danger" onClick={() => this.deleteTodo(item._id)}><i className="fa fa-trash"></i></button>
                        <button type="button" className="btn-icon1 btn btn-info"  onClick={() => this.updateTodo(item._id)}><i className="fa fa-edit"></i></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


      </div>

    )
  }

}
