import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import axios from "axios"


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

export default Schools
