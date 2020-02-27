// components tell React what to render to user's screen
// NOTE: components always start like this
// line 5 since we are using react router we need to import { Link } as below
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// here is our Component, which takes in Props, which returns Views 
// which are Rendered via JSX to vDOM then to the actual DOM
export default class Navbar extends Component {
// JSX that React will use to manipulate DOM
// Returns what you plan to display to user
  render() {
    return (
      // JSX below can take any JS code in {} like {this.props.name}
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}