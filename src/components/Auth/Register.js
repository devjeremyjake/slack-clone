import React from 'react';
import {
	Grid,
	Form,
	Segment,
	Button,
	Header,
	Message,
	Icon,
} from 'semantic-ui-react';
import md5 from 'md5';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

class Register extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordconfirmation: '',
		errors: [],
		loading: false,
		usersRef: firebase.database().ref('users'),
	};

	// Form validation
	isFormEmpty = ({ username, email, password, passwordconfirmation }) => {
		return (
			!username.length ||
			!email.length ||
			!password.length ||
			!passwordconfirmation.length
		);
	};

	isPasswordValid = ({ password, passwordconfirmation }) => {
		if (password.length < 6 || passwordconfirmation < 6) {
			return false;
		} else if (password !== passwordconfirmation) {
			return false;
		} else {
			return true;
		}
	};

	isFormValid = () => {
		let errors = [];
		let error;

		if (this.isFormEmpty(this.state)) {
			// throw error
			error = { message: 'Fill in all fields' };
			this.setState({ errors: errors.concat(error) });
			return false;
		} else if (!this.isPasswordValid(this.state)) {
			// throw error
			error = { message: 'Password is invalid' };
			this.setState({ errors: errors.concat(error) });
			return false;
		} else {
			return true;
		}
	};

	// End of form Validation.

	// Error Display
	displayErrors = (errors) =>
		errors.map((error, i) => <p key={i}>{error.message}</p>);

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Handle submit format
	handleSubmit = (event) => {
		event.preventDefault();
		if (this.isFormValid()) {
			this.setState({ errors: [], loading: true });
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then((createUser) => {
					// console.log(createUser);
					createUser.user
						.updateProfile({
							displayName: this.state.username,
							photoURL: `https://gravatar.com/avatar/${md5(
								createUser.user.email
							)}?d=identicon`,
						})
						.then(() => {
							this.saveUser(createUser).then(() => {
								console.log('user saved');
							});
						})
						.catch((error) => {
							console.log(error);
							this.setState({
								errors: this.state.errors.concat(error),
								loading: false,
							});
						});
				})
				.catch((error) => {
					console.log(error);
					this.setState({
						errors: this.state.errors.concat(error),
						loading: false,
					});
				});
		}
	};

	saveUser = (createUser) => {
		return this.state.usersRef.child(createUser.user.uid).set({
			name: createUser.user.displayName,
			avatar: createUser.user.photoURL,
		});
	};

	handleInputError = (errors, inputName) => {
		return errors.some((error) =>
			error.message.toLowerCase().includes(inputName)
		)
			? 'error'
			: '';
	};

	render() {
		const {
			username,
			email,
			password,
			passwordconfirmation,
			errors,
			loading,
		} = this.state;
		return (
			<Grid textAlign="center" verticalAlign="middle" className="app">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" icon color="orange" textAlign="center">
						<Icon name="puzzle piece" color="orange" />
						Register for Slack Clone
					</Header>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment stacked>
							<Form.Input
								fluid
								name="username"
								icon="user"
								iconPosition="left"
								placeholder="Username"
								onChange={this.handleChange}
								value={username}
								type="text"
							/>
							<Form.Input
								fluid
								name="email"
								icon="mail"
								iconPosition="left"
								placeholder="Email Address"
								onChange={this.handleChange}
								type="email"
								value={email}
								className={this.handleInputError(errors, 'email')}
							/>
							{/* password */}
							<Form.Input
								fluid
								name="password"
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								onChange={this.handleChange}
								type="password"
								value={password}
								className={this.handleInputError(errors, 'password')}
							/>
							{/* Re-enter password */}
							<Form.Input
								fluid
								name="passwordconfirmation"
								icon="repeat"
								iconPosition="left"
								placeholder="Password confirmation"
								onChange={this.handleChange}
								type="password"
								value={passwordconfirmation}
								className={this.handleInputError(errors, 'password')}
							/>

							<Button
								disabled={loading}
								className={loading ? 'loading' : ''}
								color="orange"
								fluid
								size="large"
							>
								Submit
							</Button>
						</Segment>
					</Form>
					{errors.length > 0 && (
						<Message error>
							<h3>Error</h3>
							{this.displayErrors(errors)}
						</Message>
					)}
					<Message>
						Already a User?{' '}
						<Link className="redirect" to="/Login">
							Login
						</Link>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Register;
