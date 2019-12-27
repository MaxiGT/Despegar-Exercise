import React from  'react';
import PropTypes from 'prop-types';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }
  
  handleOnChange = (evt) => {
    if (this.props.onChange) this.props.onChange(evt);
    if (this.state.errorMessage !== '') {
      const errorMessage = '';
      this.setState({
        errorMessage,
      });
    }
  }

  handleBlur = (evt) => {
    if (this.props.onBlur) this.props.onBlur(evt);
    if (this.props.isRequired && evt.target.value === '') {
      const errorMessage = 'Este campo es obligatorio';
      this.setState({
        errorMessage,
      });
    }
  }

  render() {

    const { name, value, label, placeholder, length } = this.props;

    return (
      <div className='form-group'>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">{label}</span>
          </div>
          <textarea
            name={name}
            value={value}
            onChange={(evt) => this.handleOnChange(evt)}
            onBlur={(evt) => this.handleBlur(evt)}
            className="form-control"
            placeholder={placeholder}
            aria-label="Default"
            maxLength={length}
            aria-describedby="inputGroup-sizing-default" />
        </div>
        <span className='help-block'>Restan {length - value.length} caracteres</span>
        <span className='help-block float-right'
          style={{ color: 'red', fontWeight: 'bold' }}>{this.state.errorMessage}</span>
      </div>
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
}

TextArea.defaultProps = {
  placeholder: '',
  value: '',
}

export default TextArea;