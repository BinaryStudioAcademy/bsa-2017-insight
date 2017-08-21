import React from 'react';
import propTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import RadioChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import styles from './styles.scss';

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: '',
    };
  }

  componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount(this.props.matching);
  }

  render() {
    if (this.props.type === 'multiple') {
      return (this.props.childs.map((child) => {
        return (<ListItem
          primaryText={child.text}
          key={child.matching}
          initiallyOpen={false}
          primaryTogglesNestedList
          rightIcon={<div />}
          onClick={() => this.props.onCustomInputClick && this.props.onCustomInputClick(child.matching)}
          leftCheckbox={
            <Checkbox
              checkedIcon={<RadioChecked />}
              uncheckedIcon={<RadioUnchecked />}
              checked={child.displayChildren}
            />}
          nestedItems={child.displayChildren && [
            <TextField
              className={styles['radio-input']}
              hintText="Search value"
              ref={(node) => {
                this.input = node;
              }}
              onChange={() => {
                if (this.props.onInputChange) this.props.onInputChange(child.matching, this.input.input.value);
              }}
            />]
          }
        />);
      }));
    } else if (this.props.type === 'single') {
      return (
        <TextField
          key={this.props.matching}
          className={styles['checkbox-input']}
          hintText="Search value"
          ref={(node) => {
            this.input = node;
          }}
          onChange={() => {
            if (this.props.onInputChange) this.props.onInputChange(this.props.matching, this.input.input.value);
          }}
        />
      );
    } else if (this.props.type === 'select') {
      return (
        <SelectField
          className={styles.select}
          key={this.props.matching}
          value={this.state.select}
          floatingLabelText="Device Type"
          ref={(node) => {
            this.input = node;
          }}
          onChange={(event, index, value) => {
            this.setState({ select: value });
            if (this.props.onInputChange) this.props.onInputChange(this.props.matching, value);
          }}
        >
          {this.props.options.map((option) => {
            return <MenuItem value={option} primaryText={option} />;
          })}
        </SelectField>
      );
    } else {
      return <div>kek</div>;
    }
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
