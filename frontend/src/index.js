import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from "./components/Container"
import {Landing} from "./components/Landing"
import './index.css';
import img from "./linkedin.png"
import img2 from "./github.png"


ReactDOM.render(

  <React.StrictMode>
    <Landing/>
    <Container/>
    <footer> <p>This site was &#x26A1; by Om <a href="https://github.com/omegaji"><img style={{"backgroundColor":"#85BDBF"}}src={img2}></img></a><a href="https://www.linkedin.com/in/om-purohit-957187175/"><img style={{"backgroundColor":"#85BDBF"}}src={img}></img></a></p></footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
