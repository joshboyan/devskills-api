import React , { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';

export class Form extends Component {
  constructor() {
		super();
		this.state = {
			emailValue: '',
			passwordValue: '',
			key: null
		}
		this.getValidationState = this.getValidationState.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.createUser = this.createUser.bind(this);
	}

  getValidationState() {
    const email = this.state.emailValue;
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
			return 'success';
		} else {
			return 'error';
		}
  }

  handleEmailChange(e) {
    this.setState({ emailValue: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ passwordValue: e.target.value });
  }

	createUser(e) {
		e.preventDefault();
		if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.emailValue)) {
			axios.post('/api/users', {
				email: this.state.emailValue,
				password: this.state.passwordValue
			}).then( key => {
				this.setState({
					key: [key.data]
				});
			}).catch( err => { console.error(err) })
		} else {
			console.warn("Fill out the form!!");
		}
	}

  render() {
    return (
			<div>
				{ !this.state.key ?
				<div>
				<p>Sign up for a key to use the DevSkills API. AddThe key is in the form of a JSON web token. Just add a query parameter of 'key' with the entire web token to use.</p>
				<p>For example:</p>
				<p>fetch(https://devskillsapi.herokuapp.com/api/skills?key=yourUniqueKey)</p>
				<form onSubmit={ this.createUser }>
					<FormGroup
						controlId="formBasicText"
						validationState={ this.getValidationState() }
					>
						<ControlLabel>Enter a Valid Email</ControlLabel>
						<FormControl
							type="text"
							value={ this.state.emailValue }
							placeholder="Enter a Valid Email"
							onChange={ this.handleEmailChange }
						/>
						<FormControl.Feedback />
					</FormGroup>
					<FormGroup
						controlId="formBasicText"
					>
						<ControlLabel>Create a Password</ControlLabel>
						<FormControl
							type="text"
							value={ this.state.passwordValue }
							placeholder="Create a Password"
							onChange={ this.handlePasswordChange }
						/>
					</FormGroup>
					<button
						className='btn'
					>Get Key</button>
				</form>
				<span>I will never use your email for evil or sell/distribute/loan it to anyone. I hate spam too!</span>
			</div>
			: <pre>{ JSON.stringify(this.state.key, null, 2) }</pre> }
			</div>
    );
  }
}
