import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg container">

        <Link to="/" className="navbar-brand">To-Do App</Link>

        </nav>

      </nav>
    );
  }
}
