import PropTypes from 'prop-types';

const InputText = ({ inputClass = "", maxLength=60, placeHolderText="", onChangeFunc, value="" }) => {

    return (
        <>
            <input 
                className={`input-text ${inputClass}`.trim()}
                type="text" 
                maxLength={maxLength}
                placeholder={placeHolderText}
                value={value}
                onChange={onChangeFunc}
            />
        </>
    )

}

InputText.propTypes = {
    inputClass: PropTypes.string,
    onChange: PropTypes.func,
    maxLength: PropTypes.string,
    placeHolderText: PropTypes.string,
    onChangeFunc: PropTypes.func,
    value: PropTypes.string
}

export default InputText;
  