import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import 'react-bootstrap';
import routeData from './data.json';
import axios from 'axios';
import { SideNav } from './SideNav';
import { Response } from './Response';

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
		this.updateSideNavLinks = this.updateSideNavLinks.bind(this);
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

	updateSideNavLinks(linkState) {
		console.log(linkState);
		this.setState({
			selected: linkState.selected,
			results: []
		});
	}

  handleSelectChange(event) {
    this.setState({selectValue: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1><a href="/">DevSkills API</a></h1>
          <h3><a href="#" target="_blank">App</a></h3>
        </header>
        <main>
        <Row>
          <Col xs={12} sm={4}>
					<SideNav
						routes={ this.state.routes }
						selected={ this.state.selected }
						updateSideNavLinks={ this.updateSideNavLinks }/>
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
						<Response
							selected={ this.state.selected }
							routes={ this.state.routes }
							skills={ this.state.skills }
							selectedValue={ this.state.selectValue }
							results={ this.state.results }
							handleSelectChange={ this.handleSelectChange }
							handleFetch={ this.handleFetch } />
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
