import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import axios from "axios"

import Nav from './nav';
import store, {getSchoolsThunk, getStudentsThunk} from './store';
import Schools from './school';
import Students from './students';


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
