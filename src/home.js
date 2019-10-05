import { render } from 'react-dom';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import axios from "axios"


const _Home = ({ schools, students })=>{

  const studentToSchool = students.map(student => {
    return {...student, school: schools.find(school => school.id === student.schoolId)}
  });
  const schoolToStudent = schools.map(school => {
    return {...school, student: students.filter(student => student.schoolId === school.id)}
  })


  // const popular = schoolToStudent.reduce((a,b)=> a.student > b.student ? a : b, [])
  // const counter = schoolToStudent.map(school => {
  //   return school.student.length
  // })
  // const count = Math.max(...counter)

  // // .reduce((a,b)=> a.GPA > b.GPA ? a : b, [])  .reduce((a,b)=> a.GPA + b.GPA, 0)

  // const smartestStudent = studentToSchool.map(student => {
  //   return student.school.name
  // }).reduce((a,b)=> a.GPA > b.GPA ? a : b, []);


  // const rightSchool = schoolToStudent.map( school => {
  //   if(school.name === smartestStudent){
  //     return school.student
  //   }
  // })
  // const filter = rightSchool.filter(arr => {
  //   if(arr !== undefined){
  //     return arr
  //   }
  // })
  // const arr = filter.map(arr => {
  //   return arr.map(arr => arr.GPA)
  // })
  // const arr1 = arr.reduce((prev, curr)=> {
  //   return prev.concat(curr)
  // }, []);
  // const numbers = arr1.map(Number);
  // const avg = numbers.reduce((a,b)=> a+b,0)/numbers.length


  // console.log(studentToSchool);
  // console.log(schoolToStudent);
  // console.log(avg)
  return (
    <div>
      <h1>Home</h1>
      {/* <p>Our most popular school is {popular.name} with {count} students.</p>
      <p>Our top proforming school is {smartestStudent} with an average GPA of {avg.toFixed(1)} </p> */}
    </div>
  )
}

const Home = connect(({schools, students})=>{
  return {
    schools,
    students
  }
})(_Home)

export default Home
