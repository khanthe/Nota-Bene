import PropTypes from 'prop-types';

const Button = ({ buttonClass = "", onClick, children }) => {

    return (
        <>
            <button 
                className={`btn ${buttonClass}`.trim()} 
                onClick={onClick}>
            {children}
            </button>
        </>
    )

}

Button.propTypes = {
    buttonClass: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node
}

export default Button;
  