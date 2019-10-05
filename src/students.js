import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import axios from "axios"


import {createStudentThunk, deleteStudentThunk, updateStudentThunk} from './store'
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
    this.create = this.create.bind(this);
    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);
  }
  async create(){
    await this.props.toCreate(this.state);
  }
  async destroy(student){
    await this.props.toDestroy(student);
  }
  async update(student){
    await this.props.toUpdate(student)
  }
  render(){
    // console.log(this.props.students)
  return (
    <div>
      <form onSubmit={ev => ev.preventDefault()} className='application'>
        <div>First Name: <input value={this.state.firstName} placeholder='first name' onChange={ev=> this.setState({firstName: ev.target.value})}/></div>
        <div>Last Name: <input value={this.state.lastName} placeholder='last name' onChange={ev=> this.setState({lastName: ev.target.value})}/></div>
        <div>Email: <input value={this.state.Email} placeholder='email' onChange={ev=> this.setState({Email: ev.target.value})}/></div>
        <div>GPA: <input value={this.state.GPA} placeholder='GPA' onChange={ev=> this.setState({GPA: ev.target.value})}/>
        </div>





        <div>
          <select selected={this.state ? this.state.schoolId : '-- not Enrolled --'}
          onChange={ev = this.update(ev.target.selected)}
          >
          <option value='-- not Enrolled --' >-- not Enrolled --</option>
          {
            this.props.schools.map((school) => <option key={school.id} value={school.name} >{school.name}</option>)
          }
          </select>
        </div>





        <button onClick={this.create}>Add Student</button>
        <div>
        <div className='ordering'>
          {
            this.props.students.map( student => <div key={student.id} className='student' >{student.firstName} {student.lastName}
            <br />
            {student.GPA}
            <br />
            <select>
            {
              ['-- not enrolled --', 'Havard', 'MIT', 'Stanford', 'UCLA', 'UC Berkley', 'UC Davis'].map((school, idx) => <option key={idx}>{school}</option>)
            }
            </select>
            <br />
            <button onClick={()=> this.destroy(student)}>Destroy Student</button>
            <br />
            </div>)
          }
        </div>
        </div>
      </form>
    </div>
  )
  }
}
const Students = connect(({students, schools})=>{
  return {
    students,
    schools
  }
}, (dispatch)=>{
  return{
    toCreate: (student) => dispatch(createStudentThunk(student)),
    toDestroy: (student) => dispatch(deleteStudentThunk(student)),
    toUpdate: (student) => dispatch(updateStudentThunk(student))
  }
})(_Students)

export default Students
