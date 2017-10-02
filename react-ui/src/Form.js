import React , { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class Form extends Component {
  constructor() {
		super();
		this.state = {
			value: ''
		}
		this.getValidationState = this.getValidationState.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

  getValidationState() {
    const email = this.state.value;
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return 'success';
    else return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
			<div>
				<h2>Get an API key</h2>
				<p>Sign up for a key to use the DevSkills API. The key is in the form of a JSON web token. Just add a query parameter of 'key' with the entire web token to use.</p>
				<p>For example:</p>
				<p>fetch(https://devskillsapi.herokuapp.com/api/skills?key=yourUniqueKey)</p>
				<form>
					<FormGroup
						controlId="formBasicText"
						validationState={this.getValidationState()}
					>
						<ControlLabel>Enter a Valid Email</ControlLabel>
						<FormControl
							type="text"
							value={this.state.value}
							placeholder="Enter a Valid Email"
							onChange={this.handleChange}
						/>
						<FormControl.Feedback />
					</FormGroup>
					<FormGroup
						controlId="formBasicText"
						validationState={this.getValidationState()}
					>
						<ControlLabel>Create a Password</ControlLabel>
						<FormControl
							type="text"
							value={this.state.value}
							placeholder="Create a Password"
							onChange={this.handleChange}
						/>
						<FormControl.Feedback />
					</FormGroup>
				</form>
				<p>I will never use your email for evil or sell/distribute/loan it to anyone. I hate spam too!</p>
			</div>
    );
  }
}
