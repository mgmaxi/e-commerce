import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import './sign-up-form.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
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
		if (!displayName || !email || !password || !confirmPassword) {
			alert('Fill all the fields');
			return;
		}
		if (password !== confirmPassword) {
			alert("Password don't match");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			setCurrentUser(user);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use.');
			}
			console.log(error.message);
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Name"
					type="text"
					onChange={handleChange}
					name="displayName"
					value={displayName}
					required
				/>

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

				<FormInput
					label="Confirm Password"
					type="password"
					onChange={handleChange}
					name="confirmPassword"
					value={confirmPassword}
					required
				/>

				<Button type="submit" btnText="Sign up" />
			</form>
		</div>
	);
};

export default SignUpForm;
