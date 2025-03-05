import PropTypes from 'prop-types';
import CloseButton from './CloseButton';

const Modal = ({ onClose, modalClass = "", children }) => {

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className={`modal-container ${modalClass}`} onClick={(e) => e.stopPropagation()}>
                    <CloseButton buttonClass="btn-secondary" onClose={onClose} />
                    {children}
                </div>
            </div>
        </>
    )

}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    modalClass: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default Modal;