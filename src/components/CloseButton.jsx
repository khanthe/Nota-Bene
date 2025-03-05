import PropTypes from 'prop-types';

const CloseButton = ({ onClose, buttonClass="" }) => {

    return (
        <>
            <button className={`btn-close ${buttonClass}`} onClick={onClose}>X</button>
        </>
    )

}

CloseButton.propTypes = {
    onClose: PropTypes.func.isRequired,
    buttonClass: PropTypes.string
}

export default CloseButton;
