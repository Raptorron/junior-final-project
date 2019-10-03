import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import axios from "axios"

const GET_STUDENTS = 'GET_STUDENTS';

const GET_SCHOOLS = 'GET_SCHOOLS';

const schoolReducer = (state=[], action)=>{
  if(action.type === GET_SCHOOLS){
    return action.schools
  }
  return state
}
const studentReducer = (state=[], action)=>{
  if(action.type === GET_STUDENTS){
    return action.students
  }
  return state
}

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const getSchools = (schools) => ({type: GET_SCHOOLS, schools});
const getStudents = (students) => ({type: GET_STUDENTS, students});

const getSchoolsThunk = ()=>{
  return async (dispatch)=>{
    const schools = (await axios.get(`/api/schools`)).data
    dispatch(getSchools(schools))
  }
}
const getStudentsThunk = ()=>{
  return async (dispatch)=>{
    const students = (await axios.get('/api/students')).data
    dispatch(getStudents(students))
  }
}


const _Nav = () =>{
  return (
    <nav>
      <NavLink to='/schools' >Schools</NavLink>
      <NavLink to='/students' >Students</NavLink>
    </nav>
  )
}

const Nav = connect()(_Nav)

const _Schools = ({ schools})=>{
  return (
    <div>
      <ul>
        {
          schools.map( school => <li key={school.id} >{school.name}</li>)
        }
      </ul>
    </div>
  )
}

const Schools = connect(({schools})=>{
  return {
    schools
  }
})(_Schools)

const _Students = ({students}) => {
  return (
    <div>
      <ul>
        {
          students.map( student => <li key={student.id} >First name: {student.firstName} Last name: {student.lastName} Email: {student.Email} GPA: {student.GPA}</li>)
        }
      </ul>
    </div>
  )
}

const Students = connect(({students})=>{
  return {
    students
  }
})(_Students)

class _App extends Component{
  async componentDidMount(){
    this.props.getSchools();
    this.props.getStudents();
  }
  render(){
    return (

        <HashRouter>
          <Route component={Nav}/>} />
          <Route path='/schools' component={Schools} />
          <Route path='/students' component={Students} />} />
        </HashRouter>
    )
  }
}

const App = connect(null, (dispatch)=>{
  return {
    getSchools: ()=> dispatch(getSchoolsThunk()),
    getStudents: ()=> dispatch(getStudentsThunk())
  }
})(_App)

render( <Provider store={store}><App /></Provider>, root);
