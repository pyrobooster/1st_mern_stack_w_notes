// compone// components tell React what to render to user's screen
// NOTE: components always start like this
// line 5 since we are using react router we need to import { Link } as belownts tell React what to render to user's screen
import React, { Component } from 'react';
// Axios handles http requests to send data back and forth to mongo
import axios from 'axios';

// here is our Component, which takes in Props, which returns Views 
// which are Rendered via JSX to vDOM then to the actual DOM
export default class CreateUser extends Component {
  // in JS classes call "super" when defining the constructor of a sub class
  // all React comp classes that have constructors should start with a super(props) call
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
// creating what will be sent over with the Submit button
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);
    // SEND USER DATA TO BACK END when they enter it
    //  ".then" promise take result and console log it (or do something else i guess )
    // end point is expecting a JSON object in the request body that what we are sending
    // with the second arguement "user"  see users.js file for notes on this too
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }
// JSX that React will use to manipulate DOM
// Returns what you plan to display to user
  render() {
    // JSX below can take any JS code in {} like {this.props.name}
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}