import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import 'react-bootstrap';
import routeData from './data.json';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      routes: routeData,
      selected: 0,
      skills: [], 
      results: {}
    }
    this.handleFetch = this.handleFetch.bind(this);
  }
  handleFetch() {
    axios.get(this.state.routes[this.state.selected].route)
      .then(results => {
        console.log('We fetched the data!', results);
        this.setState({
          results: results.data
        });
      }).catch(err => {
        console.error('There was a problem fetching the data', err);
      });
  }
  render() {
    return (
      <div className="App">
        <header className="dark-primary-color text-primary-color">
          <h1><a href="/">DevSkills API</a></h1>
          <h3><a href="#" target="_blank">App</a></h3>
        </header>
        <main>
        <Row>
          <Col xs={12} sm={4}>
            <div>
              <p onClick={ ()=> this.setState({selected: 0})}>Docs</p>
              <hr />
              <p>Routes</p>
            </div>
            <ul>
              {this.state.routes.map((route, i) => {
                return(
                route.route ?
                  <li key={i}
                    onClick={ () => this.setState({selected: i})}>
                    {route.route}
                  </li> :
                  null
                )
              })}
            </ul>
          </Col> 
          <Col xs={12} sm={8}>
            <h2>{this.state.routes[this.state.selected].route}</h2>
            <p>{this.state.routes[this.state.selected].description}</p>
          </Col> 
        </Row>
        <Row>
          <Col xs={12}>
          <h3>Try it out</h3>
          <hr />
              <div>fetch(https://devskillsapi.herokuapp.com{this.state.routes[this.state.selected].route})</div>
              {this.state.selected > 3 ?
              <select>
                <option value="java">java</option>
                <option value="python">python</option>
                <option value="php">php</option>
                <option value="aws">aws</option>
              </select> : null }
              <button onClick={ this.handleFetch }>Fetch Results</button>
            <pre></pre>
          </Col>
        </Row>
          
        </main>
      </div>
    );
  }
}

export default App;
