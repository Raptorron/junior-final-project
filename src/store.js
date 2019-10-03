import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import axios from "axios"
import Students from './students';

const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENTS = 'ADD_STUDENTS'

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
  return state
}

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const getSchools = (schools) => ({type: GET_SCHOOLS, schools});
const getStudents = (students) => ({type: GET_STUDENTS, students});
const createStudent = (student) => ({type: ADD_STUDENTS, student})

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
  return async (dispatch)=>{
    const created = (await axios.get('/api/students', student)).data
    dispatch(createStudent(created))
  }
}
export default store;
export {getSchoolsThunk, getStudentsThunk, createStudentThunk}
