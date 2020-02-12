import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';

import Navbar from "./components/navbar.component";
import AddTodo from "./components/add-todo.component";
import DisplayTodo from "./components/display-todo.component";


const App = () => {
  return (
    <Router>

      <Navbar />

      <br/>

      <div className="container">

        <div className="row content-row-container">

          <div className="col">
            <DisplayTodo />
          </div>

          <div className="col-4">
            <AddTodo />
          </div>

        </div>

      </div>
    </Router>
  );
}

export default App;
