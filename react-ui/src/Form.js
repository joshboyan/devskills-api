import React, { Component } from 'react';
import { 
	FormGroup, 
	FormControl, 
	ControlLabel, 
	HelpBlock } from 'react-bootstrap';
import axios from 'axios';

export class Form extends Component {
  state = {
		email: '',
		validEmail: true,
		password: '',
		validPassword: true,
		key: null
	}

  emailValidation = () => {
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
			this.setState({ validEmail: true })
			return true
		} else {
			this.setState({ validEmail: false })
		}
	}

	passwordValidation = () => {
		const { password } = this.state;

		if(password.length > 4) {
			this.setState({ validPassword: true })
			return true
		} else {
			this.setState({ validPassword: false })
		}
	}

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  }

	createUser = e => {
		const { email, password } = this.state;
		const validEmail = this.emailValidation();
		const validPassword = this.passwordValidation()
		
		e.preventDefault();
		if (validEmail && validPassword) {
			axios.post('/api/users', {
				email,
				password
			})
			.then( key => {
				this.setState({
					key: [key.data]
				});
			})
			.catch( err => { console.error(err) })
		} else {
			console.warn("Fill out the form!!");
		}
	}

  render() {
		const {
			email,
			validEmail,
			password,
			validPassword,
			key } = this.state;

    return (
			<div>
				{ !key ?
					<div>
						<p>Sign up for a key to use the DevSkills API. AddThe key is in the form of a JSON web token. Just add a query parameter of 'key' with the entire web token to use.</p>
						<p>For example:</p>
						<p>fetch(https://devskillsapi.herokuapp.com/api/skills?key=yourUniqueKey)</p>
						
						<form onSubmit={ this.createUser }>
							
							<FormGroup controlId="email">
								<ControlLabel>Enter a Valid Email</ControlLabel>
								<FormControl
									type="text"
									value={ email }
									placeholder="Enter a Valid Email"
									onChange={ this.handleEmailChange }
									className={ !validEmail ? 'has-error' : ''}
								/>
								<div role="alert">	
									{ !validEmail && <HelpBlock>Please enter a valid email.</HelpBlock> }
								</div>
							</FormGroup>

							<FormGroup controlId="password">
								<ControlLabel>Create a password</ControlLabel>
								<FormControl
									type="text"
									value={ password }
									placeholder="Create a Password"
									onChange={ this.handlePasswordChange }
									className={ !validPassword ? 'has-error' : ''}
								/>
								<div role="alert">
									{ !validPassword && <HelpBlock>Create a password at least 5 characters long.</HelpBlock> }
								</div>
							</FormGroup>
							
							<button	className='btn'>Get Key</button>
						</form>

						<span>I will never use your email for evil or sell/distribute/loan it to anyone. I hate spam too!</span>
					</div>
					: <pre>{ JSON.stringify(key, null, 2) }</pre> 
				}
			</div>
    )
  }
}
