import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { Dropdown, Grid, Header, Icon, Image } from 'semantic-ui-react';

class UserPanel extends React.Component {
	state = {
		user: this.props.currentUser,
	};

	dropdownOptions = () => [
		{
			key: 'user',
			text: (
				<span>
					signed in as <strong>{this.state.user.displayName}</strong>
				</span>
			),
			disabled: true,
		},
		{
			key: 'avatar',
			text: <span>Change Avatar</span>,
		},
		{
			key: 'signout',
			text: <span onClick={this.handleSignout}>Sign Out</span>,
		},
	];

	handleSignout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => console.log('Succesfully signed Out'));
	};
	render() {
		const { user } = this.state;

		return (
			<Grid style={{ background: '#3F0E40' }}>
				<Grid.Column>
					<Grid.Row style={{ padding: '1.2em', margin: 0 }}>
						{/* App Header */}
						<Header inverted floated="left" as="h2">
							<Icon name="code" />
							<Header.Content>SlackClone</Header.Content>
						</Header>

						{/* User Dropdown */}
						<Header style={{ padding: '0.25em' }} as="h4" inverted>
							<Dropdown
								trigger={
									<span>
										<Image src={user.photoURL} spaced="right" avatar />
										{user.displayName}
									</span>
								}
								options={this.dropdownOptions()}
							/>
						</Header>
					</Grid.Row>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(UserPanel);
