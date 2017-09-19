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
      selectValue: 'javascript',
      results: []
    }
    this.handleFetch = this.handleFetch.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    axios.get('/api/skills')
    .then(counts => {
      let skills = counts.data[counts.data.length-1].map(skill => {
        return skill.name;
      })
      return skills;
    }).then(skills => {
      this.setState({
        skills: skills
      });
    }).catch(err => { console.error(err) })
  }

  handleFetch() {
    axios.get(this.state.routes[this.state.selected].route.replace(':skill', this.state.selectValue))
      .then(results => {
        console.log('We fetched the data!', results.data);
        this.setState({
          results: results.data
        });
      }).catch(err => {
        console.error('There was a problem fetching the data', err);
      });
  }

  handleSelectChange(event) {
    this.setState({selectValue: event.target.value});
  }

  render() {
    const active = {
      textDecoration: 'none',
      color: '#757575'
    }
    return (
      <div className="App">
        <header>
          <h1><a href="/">DevSkills API</a></h1>
          <h3><a href="#" target="_blank">App</a></h3>
        </header>
        <main>
        <Row>
          <Col xs={12} sm={4}>
            <div>
              <p className='link' 
                onClick={ ()=> this.setState({selected: 0, results: []})}>Docs</p>
              <hr />
              <p>Routes</p>
            </div>
            <ul>
              {this.state.routes.map((route, i) => {
                return(
                route.route ?
                  <li key={i}
                    className='link'
                    onClick={ () => this.setState({selected: i})}>
                    {route.route}
                  </li> :
                  null
                )
              })}
            </ul>
          </Col> 
          <Col xs={12} sm={8}>
            {this.state.selected === 0 ? 
              <h2>Docs</h2> : 
              <h2>{this.state.routes[this.state.selected].route}</h2>}
            <p>{this.state.routes[this.state.selected].description}</p>
          </Col> 
        </Row>
        <Row>
          <Col xs={12}>
          { this.state.selected !== 0 ?
          <div>
          <h3>Try it out</h3>
          <hr />
              <div>fetch(https://devskillsapi.herokuapp.com{this.state.routes[this.state.selected].route.replace(':skill', this.state.selectValue)})</div>
              {this.state.selected > 3 ?
              <select 
                value={this.state.selectValue} 
                onChange={this.handleSelectChange}>
                {this.state.skills.map(skill => {
                  return <option value={skill}>{skill}</option>
                })}                
              </select> : null }
              <button 
                className='btn'
                onClick={ this.handleFetch }>Fetch Results</button>
            <pre>{JSON.stringify(this.state.results, null, 2)}</pre>
            </div> : null
          }
          </Col>
        </Row>          
        </main>
        <footer className={this.state.selected === 0 ? 'footer': null}>
          <a href='joshboyan.com'>&copy; Josh Boyan 2017</a>
        </footer>
      </div>
    );
  }
}

export default App;
