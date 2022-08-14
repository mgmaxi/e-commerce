import './button.scss';

const BUTTON_TYPE_CLASSES = {
	google: 'google-sign-in',
	inverted: 'inverted',
};

const Button = ({ btnText, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}
		>
			{btnText}
		</button>
	);
};

export default Button;
