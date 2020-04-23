import React from 'react';

const formValid = ({ formErrors, submitDisabled, password, confirmPassword, ...rest }) => {
	let valid = true;

	Object.values(formErrors).forEach((val) => val.length > 0 && (valid = false));

	Object.values(rest).forEach((val) => val === null && (valid = false));

	password !== confirmPassword && (valid = false);
	if (valid) submitDisabled = false;
	return { valid, submitDisabled };
};

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: null,
			email: null,
			password: null,
			confirmPassword: null,
			passwordHint: null,
			termsBox: false,
			isSuccess: false,
			formErrors: {
				fullNameError: '',
				emailError: '',
				passwordError: '',
				confirmPasswordError: '',
				passwordHintError: '',
				termsBoxError: ''
			}
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if (formValid(this.state).valid) {
			console.log(`
			SUBMITING
			Full name: ${this.state.fullName}
			Email: ${this.state.email}
			Password: ${this.state.password}
			Confirm Password: ${this.state.confirmPassword}
			Password hint: ${this.state.passwordHint}
			`);
			this.setState({ isSuccess: true });
		} else {
			console.error('Invalid Form');
		}
	};
	isFormValid = () => {
		const {
			fullNameError,
			emailError,
			passwordError,
			confirmPasswordError,
			passwordHintError,
			termsBoxError
		} = this.state.formErrors;
		const { fullName, email, password, confirmPassword, passwordHint, termsBox } = this.state;
		return (
			!(
				fullNameError ||
				emailError ||
				passwordError ||
				confirmPasswordError ||
				passwordHintError ||
				termsBoxError
			) &&
			(fullName && email && password && confirmPassword && passwordHint && termsBox)
		);
	};

	handleChange = (event) => {
		const { name, type, checked } = event.target;
		let { value } = event.target;
		let formErrors = this.state.formErrors;

		switch (name) {
			case 'fullName':
				let fullName = value.split(' ');

				// console.log(fullName);

				switch (fullName.length) {
					case 1:
						formErrors.fullNameError = 'Name must contain a firstname and a lastname';
						// console.log(formErrors.fullNameError);
						// console.log(fullName.length);
						break;
					case 2:
						if (fullName[1].length >= 1) {
							fullName = fullName.map((item) => {
								item = item[0].toUpperCase() + item.substring(1);
								console.log(item);
								return item;
							});
							// console.log(fullName.length);
						}
						break;
					case 3:
						if (fullName[2].length >= 1) {
							fullName = fullName.map((item) => {
								item = item[0].toUpperCase() + item.substring(1);
								console.log(item);
								return item;
							});
							// console.log(fullName.length);
						}
						break;
				}
				value = fullName.join(' ');
				if (fullName.length !== 1) {
					formErrors.fullNameError =
						value.replace(/\s/g, '').length < 10 ? 'Minimum 10 Characters required' : '';
					// console.log(formErrors.fullNameError);
				}
				break;
			case 'email':
				formErrors.emailError = !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}?(\.[a-zA-Z]{2,}|)?(\.[a-zA-Z]{2}|)$/.test(
					value
				)
					? 'Invalid email address'
					: '';
				// console.log("ERROR")
				break;
			case 'password':
				if (value.includes(' ')) formErrors.passwordError = 'Password should not include space';
				else {
					formErrors.passwordError =
						value.length < 6 || value.includes(' ') ? 'Minimum 6 Characters required' : '';
				}
				break;
			case 'confirmPassword':
				formErrors.confirmPasswordError = value !== this.state.password ? 'Password does not match' : '';
				break;
			case 'passwordHint':
				formErrors.passwordHintError =
					value === this.state.password ? 'Password hint should not be same as password' : '';
				break;
			case 'termsBox':
				formErrors.termsBoxError = !checked ? 'Accept the terms and conditions' : '';
				break;
		}
		if (name !== 'termsBox') {
			this.setState({
				formErrors,
				[name]: value
			});
		} else {
			this.setState({
				formErrors,
				[name]: checked
			});
		}
		// console.log(checked);
		// console.log(formErrors.termsBoxError);
	};

	render() {
		const { formErrors } = this.state;
		// console.log(this.isFormValid())
		return (
			<form onSubmit={this.handleSubmit} noValidate>
				<div className="fullName">
					<label htmlFor="">Full Name</label>
					<input
						type="text"
						className={formErrors.fullNameError.length > 0 ? 'error' : null}
						id="fullName"
						name="fullName"
						value={this.state.fullName}
						placeholder="Firstname Lastname"
						onChange={this.handleChange}
						errortext={this.state.fullNameError}
					/>
					{formErrors.fullNameError.length > 0 && (
						<span className="errorMessage">{formErrors.fullNameError}</span>
					)}
				</div>
				<div className="email">
					<label htmlFor="">Email</label>
					<input
						type="email"
						className={formErrors.emailError.length > 0 ? 'error' : null}
						name="email"
						id="email"
						value={this.state.email}
						onChange={this.handleChange}
						placeholder="Email"
					/>
					{formErrors.emailError.length > 0 && <span className="errorMessage">{formErrors.emailError}</span>}
				</div>
				<div className="password">
					<label htmlFor="">Password</label>
					<input
						type="password"
						className={formErrors.passwordError.length > 0 ? 'error' : null}
						name="password"
						id="password"
						value={this.state.password}
						onChange={this.handleChange}
						placeholder="Password"
					/>
					{formErrors.passwordError.length > 0 && (
						<span className="errorMessage">{formErrors.passwordError}</span>
					)}
				</div>
				<div className="confirm-password">
					<label htmlFor="">Confirm Password</label>
					<input
						type="password"
						className={formErrors.confirmPasswordError.length > 0 ? 'error' : null}
						name="confirmPassword"
						id="confirmPassword"
						value={this.state.confirmPassword}
						onChange={this.handleChange}
						placeholder="Confirm Password"
					/>
					{formErrors.confirmPasswordError.length > 0 && (
						<span className="errorMessage">{formErrors.confirmPasswordError}</span>
					)}
				</div>
				<div className="password-hint">
					<label htmlFor="">Password Hint</label>
					<input
						type="text"
						className={formErrors.passwordHintError.length > 0 ? 'error' : null}
						name="passwordHint"
						id="passwordHint"
						value={this.state.passwordHint}
						onChange={this.handleChange}
						placeholder="Password Hint"
					/>
					{formErrors.passwordHintError.length > 0 && (
						<span className="errorMessageForHint">{formErrors.passwordHintError}</span>
					)}
				</div>
				<div className="termsBox">
					<input
						type="checkbox"
						className={formErrors.termsBoxError.length > 0 ? 'error' : null}
						name="termsBox"
						id="termsBox"
						value={this.state.termsBox}
						onChange={this.handleChange}
					/>
					<label htmlFor="">I accept the terms and conditions</label>
				</div>
				{formErrors.termsBoxError.length > 0 ? (
					<span className="errorMessageForTermsBox">{formErrors.termsBoxError}</span>
				) : null}
				<div className="buttonContainer">
					<button disabled={!this.isFormValid()} className={this.isFormValid() ? 'button' : 'disabledButton'}>
						Register
					</button>
				</div>
				{this.state.isSuccess ? (
					<p style={{ color: '#15a2a8', fontSize: '1em', display: 'inline-block', margin: '0 auto' }}>
						Form Submitted! Check the console
					</p>
				) : null}
			</form>
		);
	}
}

export default Form;
