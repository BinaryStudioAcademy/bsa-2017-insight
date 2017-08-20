import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

class CustomInput extends React.Component {
  componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount(this.props.matching);
  }
  render() {
    return (
      <div className={`${this.props.class} ${styles['custom-filter']}`}>
        <input
          ref={(node) => {
            this.input = node;
          }}
          name={this.props.name}
          type={this.props.type}
          onChange={() => {
            if (this.props.onInputChange) this.props.onInputChange(this.props.matching, this.input.value);
          }}
          id={this.props.matching}
          onClick={() => this.props.onCustomInputClick && this.props.onCustomInputClick(this.props.matching)}
        />
        <label htmlFor={this.props.matching}>{this.props.text}</label>
        {this.props.children}
      </div>
    );
  }
}

CustomInput.propTypes = {
  onUnmount: propTypes.func,
  matching: propTypes.string,
  onInputChange: propTypes.func,
  onCustomInputClick: propTypes.func,
  text: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  class: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(React.PropTypes.node),
    propTypes.node,
  ]),
};

export default CustomInput;
