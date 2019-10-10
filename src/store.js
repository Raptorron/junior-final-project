import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"
import Students from './students';

const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENTS = 'ADD_STUDENTS';
const DELETE_STUDENTS = 'DELETE_STUDENTS';
const UPDATE_STUDENTS = 'UPDATE_STUDENTS';

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
  if(action.type === ADD_STUDENTS){
    return [...state, action.student]
  }
  if(action.type === DELETE_STUDENTS){
    return state.filter(student => student.id !== action.student.id)
  }
  if(action.type === UPDATE_STUDENTS){
    return state.map(student => student.id === action.student.id ? student : action.student)
  }
  return state
}

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const getSchools = (schools) => ({type: GET_SCHOOLS, schools});
const getStudents = (students) => ({type: GET_STUDENTS, students});
const createStudent = (student) => ({type: ADD_STUDENTS, student});
const deleteStudent = (student) => ({type: DELETE_STUDENTS, student});
const updateStudent = (student) => ({type: UPDATE_STUDENTS, student});

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
const createStudentThunk = (student)=>{
  console.log(student)
  return async (dispatch)=>{
    const created = (await axios.post('/api/students', student)).data
    dispatch(createStudent(created))
  }
}
const deleteStudentThunk = (student)=>{
  return async (dispatch)=>{
     await axios.delete(`/api/students/${student.id}`);
    dispatch(deleteStudent(student))
  }
}
const updateStudentThunk = (student) => {
  return async (dispatch)=>{
    const updated = {...student, schoolId: !student.schoolId}
    const toUpdate = (await axios.update(`/api/students/${student.id}`, updated)).data;
    dispatch(updateStudent(toUpdate))
  }
}
export default store;
export {getSchoolsThunk, getStudentsThunk, createStudentThunk, deleteStudentThunk, updateStudentThunk}
