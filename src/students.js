import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import axios from "axios"

//nothing to import to the store

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

export default Students
