import React from 'react';

class CustomInput extends React.Component {
  render() {
    const {
      value,
      id,
      type,
      placeholder,
      iconClass,
      hasIcon,
      error,
      helpText,
    } = this.props;
    return (
      <div
        className={
          hasIcon ? 'input-with-icon-left margin-bottom-30' : 'margin-bottom-30'
        }
      >
        <i className={hasIcon ? iconClass : ''} hidden={!hasIcon} />
        <input
          type={type}
          className="input-text with-border"
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={this.props.onChange}
        />
        {error ? <p style={{ color: 'red' }}>{helpText}</p> : null}
      </div>
    );
  }
}

export default CustomInput;
