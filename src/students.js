import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import axios from "axios"


import {createStudentThunk} from './store'
//nothing to import to the store

class _Students extends Component{
  constructor(){
    super();
    this.state={
      firstName: '',
      lastName: '',
      Email: '',
      GPA: '',
      error: ''
    }
    this.create = this.create.bind(this)
  }
  async create(){
    await this.props.toCreate(this.state);
  }
  render(){
  return (
    <div>
      <form onSubmit={ev => ev.preventDefault()}>
        <div>First Name: <input value={this.state.firstName} placeholder='first name' onChange={ev=> this.setState({firstName: ev.target.value})}/></div>
        <div>Last Name: <input value={this.state.lastName} placeholder='last name' onChange={ev=> this.setState({lastName: ev.target.value})}/></div>
        <div>Email: <input value={this.state.Email} placeholder='email' onChange={ev=> this.setState({Email: ev.target.value})}/></div>
        <div>GPA: <input value={this.state.GPA} placeholder='GPA' onChange={ev=> this.setState({GPA: ev.target.value})}/></div>
        <button onClick={this.create}>Add Student</button>
        <ul>
          {
            this.props.students.map( student => <li key={student.id}>{student.firstName} {student.lastName}</li>)
          }
        </ul>
      </form>
    </div>
  )
  }
}
const Students = connect(({students})=>{
  return {
    students
  }
}, (dispatch)=>{
  return{
    toCreate: (student) => dispatch(createStudentThunk(student))
  }
})(_Students)

export default Students
