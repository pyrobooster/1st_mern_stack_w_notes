// components tell React what to render to user's screen
// NOTE: components always start like this
// line 5 since we are using react router we need to import { Link } as belowimport React, { Component } from 'react';
import { Link } from 'react-router-dom';
// axios is library that handles http requests 
import axios from 'axios';

// THIS COMPONENT IS IMPLEMENTED AS A FUNCTIONAL REACT COMPONENT vs "class ExercisesList"
// under this which is a CLASS component
// WHATS THE DIFF?? : Lack of state and life cycle methods in Functional components.  
// Just accpeting props and returing JSX then use a FUNCTIONAL component
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      {/* Calles delete exercise component from much lower in the documetn to delete from the database  */}
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

// here is our Component, which takes in Props, which returns Views 
// which are Rendered via JSX to vDOM then to the actual DOM
export default class ExercisesList extends Component {
  // in JS classes call "super" when defining the constructor of a sub class
  // all React comp classes that have constructors should start with a super(props) call
  constructor(props) {
    super(props);
    // delete exercise from the list
    this.deleteExercise = this.deleteExercise.bind(this)
    // initialize the state, one item as an empty array 
    // waiting to be used retrieved from the database
    this.state = {exercises: []};
  }

  componentDidMount() {
    // get list of exercises from the database
    axios.get('http://localhost:5000/exercises/')
    // take the response and set state of the array below for display
      .then(response => {
        // take that response and put it into the exercises array for display
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

    // user can delete exercises too.  mongo "id" below will be deleted 
  deleteExercise(id) {
    // using axios we add the ID on to the url to bring that specific exercise ID in

    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});
    // using "setState" React will then automatically update the page for you w the new state 
    this.setState({
      // for every element in exercises array, return if it el._id !== id
      // so this removes what we say above and still shows what we did not delete
      // "_id" comes from mongo automaticall
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    // for every element called current exercise it returns Exercise components
    // which is a row of the table. We pass in 3 props
    // excercise is like a variable name and {currentexercise} its vale etc for all 3
    // see 1:38:00 of video
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }
// JSX that React will use to manipulate DOM
// Returns what you plan to display to user
  render() {
    // JSX below can take any JS code in {} like {this.props.name}
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* body calls this method and returns the rows of the table 
            exerciselist function is found just above*/}
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}