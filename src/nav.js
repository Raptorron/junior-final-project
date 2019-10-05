import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import axios from "axios"

const _Nav = () =>{
  return (
    <nav>
      <NavLink to='/'>Acme Schools</NavLink>
      <NavLink to='/schools' >Schools</NavLink>
      <NavLink to='/students' >Students</NavLink>
      <NavLink to='/mostPopular' >Most Popular (school) (count)</NavLink>
      <NavLink to='/topSchool' >Top School (school with the highest GPA)</NavLink>
    </nav>
  )
}

const Nav = connect()(_Nav)

export default Nav
