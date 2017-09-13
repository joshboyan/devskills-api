import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import 'react-bootstrap';
import CircleVisualization from './CircleVisualization';
import Skill from './Skill';

class App extends Component {
  constructor(){
    super();
    this.state = {
      counts: [
        {          
          "_id": {
              "$oid": "59b75b0e276a891410ffb042"
          },
          "date": {
              "$date": "2017-09-12T03:57:02.684Z"
          },
          "skills": [
            {
                "name": "javascript",
                "stackOverflow": 1467952,
                "indeed": 168,
                "twitter": 0
            },
            {
                "name": "java",
                "stackOverflow": 1310160,
                "indeed": 199,
                "twitter": 0
            },
            {
                "name": "c#",
                "stackOverflow": 1134760,
                "indeed": 38,
                "twitter": 0
            },
            {
                "name": "php",
                "stackOverflow": 1119502,
                "indeed": 63,
                "twitter": 0
            }        
          ]
        }
      ]  
    }
  }
  render() {
    return (
      <div className="App">
        <header className="dark-primary-color text-primary-color">
          <h1><a href="/">DevSkills</a></h1>
          <h4>Date</h4>
          <h3><a href="#" target="_blank">API</a></h3>
        </header>
        <main>
        <Row>
          <Col xs={12} sm={8}>
            <CircleVisualization />
          </Col> 
          <Col xs={12} sm={4}>
            <Skill props={this.state.counts[0].skills[0]}/>
          </Col> 
        </Row>
        </main>
      </div>
    );
  }
}

export default App;
