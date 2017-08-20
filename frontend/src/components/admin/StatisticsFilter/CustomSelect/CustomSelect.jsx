import React from 'react';
import propTypes from 'prop-types';
// import styles from './styles.scss';

class CustomSelect extends React.Component {
  componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount(this.props.matching);
  }

  render() {
    return (
      <select
        ref={(node) => {
          this.input = node;
        }}
        name={this.props.matching}
        onChange={() => {
          if (this.props.onInputChange) this.props.onInputChange(this.props.matching, this.input.value);
        }}
      >
        {this.props.options.map((option) => {
          return <option key={option} value={option}>{option}</option>;
        })}
      </select>
    );
  }
}

CustomSelect.propTypes = {
  onUnmount: propTypes.func.isRequired,
  matching: propTypes.string.isRequired,
  onInputChange: propTypes.func.isRequired,
  options: propTypes.arrayOf(propTypes.string).isRequired,
};

export default CustomSelect;
