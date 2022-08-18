import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase';

import Button from '../button/button';
import FormInput from '../form-input/form-input';
import './sign-in-form.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (!email || !password) {
			alert('Fill all the fields');
			return;
		}
		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			setCurrentUser(user);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Incorrect password for email.');
					break;
				case 'auth/user-not-found':
					alert('No user associated with this email.');
					break;
				default:
					console.log(error);
			}
		}
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		setCurrentUser(user);
		createUserDocumentFromAuth(user);
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account</h2>
			<span>Sign in with your email</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					onChange={handleChange}
					name="email"
					value={email}
					required
				/>
				<FormInput
					label="Password"
					type="password"
					onChange={handleChange}
					name="password"
					value={password}
					required
				/>
				<div className="buttons-container">
					<Button type="submit" btnText="Sign in" />
					<Button
						type="button"
						btnText="Google sign in"
						buttonType="google"
						onClick={signInWithGoogle}
					/>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
