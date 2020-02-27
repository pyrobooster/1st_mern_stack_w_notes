import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // pulls in datepicker for user to use
import "react-datepicker/dist/react-datepicker.css"; // stlye for date picker

export default class EditExercise extends Component {
  // in JS classes call "super" when defining the constructor of a sub class
  // all React comp classes that have constructors should start with a super(props) call
  constructor(props) {
    super(props);
    
    //binding "this" to each of the methods so we can "this" correctly below
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // we will set the inital state of the component by assigning an object to this.state
    // this will match up with the database format so info can be passed in and out
    // NOTE state is how yuo create variables in REACT
    // Whenever state is updated your page will automaticall update w new values
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }
// REACT LIFECYCLE METHOD - REACT knows to call this just before doing anything else
// before anything loads to page componentDidMount will run and "set the stage" for what the user can do
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
// The following functions will update the state defined at the top of the component
// So when the user changes username, this func runs & state above updates & the page re-render
// Just will update Username element within state
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
// updates description element of state
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
// updates duration element of state
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }
// updates date element of state
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }
// handles submit event on form
  onSubmit(e) {
    // STOPS default behavior of submit button
    e.preventDefault();

    // you CAN make vars within a method
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

// NOTE ABOUT THIS: "The value of ‘this’ in JavaScript functions is determined by 
// how a function is called. Methods like call, apply, and bind explicitly set 
// the value of ‘this’ in a function, however if ‘this’ isn’t explicitly set, 
// then ‘this’ will default to the global context."
    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                // array of users that comes from database
                // .map allows us to return smething for each element in an array
                // for each user in the array it will return key, value, and text
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            {/* allows to pull up calender to pick date
             npm install react-datepicker*/}
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}

// // components tell React what to render to user's screen
// // NOTE: components always start like this
// // line 5 since we are using react router we need to import { Link } as belowimport React, { Component } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// // here is our Component, which takes in Props, which returns Views 
// // which are Rendered via JSX to vDOM then to the actual DOM
// export default class EditExercise extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeDuration = this.onChangeDuration.bind(this);
//     this.onChangeDate = this.onChangeDate.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       username: '',
//       description: '',
//       duration: 0,
//       date: new Date(),
//       users: []
//     }
//   }

//   componentDidMount() {
//     axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
//       .then(response => {
//         this.setState({
//           username: response.data.username,
//           description: response.data.description,
//           duration: response.data.duration,
//           date: new Date(response.data.date)
//         })   
//       })
//       .catch(function (error) {
//         console.log(error);
//       })

//     axios.get('http://localhost:5000/users/')
//       .then(response => {
//         if (response.data.length > 0) {
//           this.setState({
//             users: response.data.map(user => user.username),
//           })
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })

//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     })
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value
//     })
//   }

//   onChangeDuration(e) {
//     this.setState({
//       duration: e.target.value
//     })
//   }

//   onChangeDate(date) {
//     this.setState({
//       date: date
//     })
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const exercise = {
//       username: this.state.username,
//       description: this.state.description,
//       duration: this.state.duration,
//       date: this.state.date
//     }

//     console.log(exercise);

//     axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
//       .then(res => console.log(res.data));

//     window.location = '/';
//   }
// // JSX that React will use to manipulate DOM
// // Returns what you plan to display to user
//   render() {
//     // JSX below can take any JS code in {} like {this.props.name}
//     return (
//     <div>
//       <h3>Edit Exercise Log</h3>
//       <form onSubmit={this.onSubmit}>
//         <div className="form-group"> 
//           <label>Username: </label>
//           <select ref="userInput"
//               required
//               className="form-control"
//               value={this.state.username}
//               onChange={this.onChangeUsername}>
//               {
//                 this.state.users.map(function(user) {
//                   return <option 
//                     key={user}
//                     value={user}>{user}
//                     </option>;
//                 })
//               }
//           </select>
//         </div>
//         <div className="form-group"> 
//           <label>Description: </label>
//           <input  type="text"
//               required
//               className="form-control"
//               value={this.state.description}
//               onChange={this.onChangeDescription}
//               />
//         </div>
//         <div className="form-group">
//           <label>Duration (in minutes): </label>
//           <input 
//               type="text" 
//               className="form-control"
//               value={this.state.duration}
//               onChange={this.onChangeDuration}
//               />
//         </div>
//         <div className="form-group">
//           <label>Date: </label>
//           <div>
//             <DatePicker
//               selected={this.state.date}
//               onChange={this.onChangeDate}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
//         </div>
//       </form>
//     </div>
//     )
//   }
// }