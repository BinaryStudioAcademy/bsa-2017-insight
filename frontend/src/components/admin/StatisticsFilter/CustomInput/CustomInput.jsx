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
      select: 'desktop',
    };
    this.renderNestedTextInput = this.renderNestedTextInput.bind(this);
  }

  renderNestedTextInput(displayChildren, key) {
    if (displayChildren) {
      return ([
        <ListItem key={this.props.matching} disabled={true} style={{ padding: 0, marginTop: '-10px', fontSize: '12px' }}>
          <TextField
            key={`${key}-1`}
            className={styles['radio-input']}
            hintText="Search value"
            ref={(node) => {
              this.input = node;
            }}
            onChange={() => {
              if (this.props.onInputChange) this.props.onInputChange(key, this.input.input.value);
            }}
            style={{paddingLeft: '25px'}}
          />
        </ListItem>]);
    }
    return [];
  }

  render() {
    if (this.props.type === 'multiple') {
      return (<ListItem
        style={{fontSize: '15px'}}
        primaryText={this.props.text}
        initiallyOpen={false}
        primaryTogglesNestedList
        onNestedListToggle={(listItem) => {
          if (listItem.props.leftCheckbox.props.checked && this.props.onUnmount) {
            this.props.onUnmount(this.props.matching);
          }
        }}
        rightIcon={<div />}
        onClick={() => this.props.onCustomInputClick && this.props.onCustomInputClick(this.props.matching)}
        leftCheckbox={
          <Checkbox checked={this.props.displayChildren} />
        }
        nestedItems={this.props.displayChildren ?
          this.props.childs.map((child) => {
            return (<ListItem
              style={{fontSize: '15px'}}
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
              nestedItems={this.renderNestedTextInput(child.displayChildren, child.matching)}
            />);
          })
          :
          []}
      />);
    } else if (this.props.type === 'single') {
      return (
        <ListItem
          style={{fontSize: '15px'}}
          primaryText={this.props.text}
          initiallyOpen={false}
          primaryTogglesNestedList
          rightIcon={<div />}
          onClick={() => this.props.onCustomInputClick && this.props.onCustomInputClick(this.props.matching)}
          onNestedListToggle={(listItem) => {
            if (listItem.props.leftCheckbox.props.checked && this.props.onUnmount) {
              this.props.onUnmount(this.props.matching);
            }
          }}
          leftCheckbox={
            <Checkbox checked={this.props.displayChildren} />
          }
          nestedItems={this.renderNestedTextInput(this.props.displayChildren, this.props.matching)}
        />
      );
    } else if (this.props.type === 'select') {
      return (
        <ListItem
          style={{fontSize: '15px'}}
          primaryText={this.props.text}
          initiallyOpen={false}
          primaryTogglesNestedList
          rightIcon={<div />}
          onClick={() => this.props.onCustomInputClick && this.props.onCustomInputClick(this.props.matching)}
          onNestedListToggle={(listItem) => {
            if (listItem.props.leftCheckbox.props.checked && this.props.onUnmount) {
              this.props.onUnmount(this.props.matching);
            }
          }}
          leftCheckbox={
            <Checkbox checked={this.props.displayChildren} />
          }
          nestedItems={this.props.displayChildren ?
            [<ListItem key={this.props.matching} disabled={true} style={{ padding: 0 }}>
              <SelectField
                className={styles.select}
                key={this.props.matching}
                value={this.state.select}
                ref={(node) => {
                  this.input = node;
                }}
                onChange={(event, index, value) => {
                  this.setState({ select: value });
                  if (this.props.onInputChange) this.props.onInputChange(this.props.matching, value);
                }}
              >
                {this.props.options.map((option) => {
                  return <MenuItem value={option} key={option} primaryText={option} />;
                })}
              </SelectField>
            </ListItem>]
            :
            []
          }
        />
      );
    }
    return null;
  }
}

CustomInput.propTypes = {
  childs: propTypes.arrayOf(propTypes.shape({
    text: propTypes.string,
    matching: propTypes.string,
    displayChildren: propTypes.bool,
  })),
  options: propTypes.arrayOf(propTypes.string),
  displayChildren: propTypes.bool,
  onUnmount: propTypes.func,
  matching: propTypes.string,
  onInputChange: propTypes.func,
  onCustomInputClick: propTypes.func,
  text: propTypes.string,
  type: propTypes.string,
};

export default CustomInput;
