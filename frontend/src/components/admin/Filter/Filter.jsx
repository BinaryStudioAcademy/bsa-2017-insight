import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import RadioChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import styles from './styles.scss';
import EmptyPlace from './EmptyPlace';

let uniqueId = 0;

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: {
        Email: 'emailValue',
        Name: 'nameValue',
        'Last seen': 'last seen Value',
      },
      initiallyOpen: {
        Email: false,
        Name: false,
        'Last seen': false,
      },
      checkedCheckboxes: {
        Email: false,
        Name: false,
        'Last seen': false,
      },
    };
    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.handleTap = this.handleTap.bind(this);
  }

  onChangeRadio(value, groupName) {
    const newRadioValue = this.state.radioValue;
    newRadioValue[groupName] = value;
    this.setState({ radioValue: newRadioValue });
  }

  getNestedItems(obj, groupName) {
    const nested = [];
    for (const elem in obj) {
      for (const elemKey in obj[elem]) {
        nested.push(
          <ListItem
            style={{ fontSize: '14px' }}
            key={elemKey}
            primaryText={elemKey}
            initiallyOpen={false}
            primaryTogglesNestedList
            rightIcon={<EmptyPlace />}
            leftCheckbox={
              <Checkbox
                onCheck={() => this.onChangeRadio(elemKey, groupName)}
                checked={this.state.radioValue[groupName] === elemKey}
                checkedIcon={<RadioChecked />}
                uncheckedIcon={<RadioUnchecked />}
              />
            }
            nestedItems={[
              <ListItem key={obj[elem][elemKey]}>
                <input type="text" style={{ width: '70px', marginRight: '10px' }} />
                <p style={{ fontSize: '14px', display: 'inline-block' }}>{obj[elem][elemKey]}</p>
              </ListItem>,
            ]}
          />);
      }
    }
    return nested;
  }

  handleTap(groupName) {
    const newInitiallyOpen = this.state.initiallyOpen;
    newInitiallyOpen[groupName] = (!newInitiallyOpen[groupName]);
    console.log();
    // this.setState({initiallyOpen: newInitiallyOpen});
    // Тут происходит магия
    // С закоментированной строкой все работает как надо.Если раскоментировать, то невозможно будет поставить 
    // галочку в checkBox.
    // При этом функция с закоментированным изменением состояния фактически ничего не делает, но если ее убрать, 
    // то при нажатии на любой "RadioButton" все выпадающие списки будут закрываться.
  }

  handleCheck(checkBoxName) {
    const checkedFields = this.state.checkedCheckboxes;
    checkedFields[checkBoxName] = (!checkedFields[checkBoxName]);
    this.setState({ checkedCheckboxes: checkedFields });
  }

  render() {
    const statisticOptions = this.props.statisticOptions;

    return (
      <div className={styles.container}>
        <div />
        <div>
          <MuiThemeProvider>
            <List>
              <Subheader style={{ fontSize: '16px', fontFamily:'Roboto' }}>User attributes</Subheader> {
                statisticOptions.items.map((elem) => {
                  return (<ListItem
                    style={{ fontSize: '14px' }}
                    leftCheckbox={
                      <Checkbox
                        onCheck={() => this.handleCheck(elem)}
                        checked={this.state.checkedCheckboxes[elem]}
                      />}
                    primaryText={elem}
                    key={uniqueId++}
                    rightIcon={<EmptyPlace />}
                    initiallyOpen={this.state.initiallyOpen[elem]}
                    onTouchTap={() => this.handleTap(elem)}
                    primaryTogglesNestedList
                    nestedItems={this.getNestedItems(statisticOptions[elem], elem)}
                  />);
                })
              }
            </List>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  statisticOptions: React.PropTypes.object.isRequired,
};

export default Filter;
