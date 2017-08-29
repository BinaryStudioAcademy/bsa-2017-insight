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
        'Last seen': 'last seen Value'
      },
      initiallyOpen: {
        Email: false,
        Name: false,
        'Last seen': false
       },
      checkedCheckboxes: {
        _id: false,
        userId: false,
        currentUrl: false,
        browserLanguage: false,
        geoLocation: false,
        online: false,
        coordinates: false,
        userIpAddress: false,
        country: false,
        city: false,
        screenWidth: false,
        screenHeight: false,
        userAgent: false,
        timeZone: false,
        browser: false,
        browserVersion: false,
        os: false,
        deviceType: false,
        _v: false,
        viewedUrls: false
      },
    };
    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.handleTap = this.handleTap.bind(this);
  }

  componentWillMount() {
    this.props.selectedFields.forEach((option) => {
        this.state.checkedCheckboxes[option] = true;
    });
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
              </ListItem>
            ]}
          />);
      }
    }
    return nested;
  }

  handleTap(groupName) {
    const newInitiallyOpen = this.state.initiallyOpen;
    newInitiallyOpen[groupName] = (!newInitiallyOpen[groupName]);
    this.setState({ initiallyOpen: newInitiallyOpen });
  }

  handleCheck(checkBoxName) {
    const checkedFields = this.state.checkedCheckboxes;
    checkedFields[checkBoxName] = (!checkedFields[checkBoxName]);
    this.setState({ checkedCheckboxes: checkedFields }, () => {
      const newFields = [];
      Object.keys(this.state.checkedCheckboxes).forEach((item) => {
        if (this.state.checkedCheckboxes[item] === true) {
          newFields.push(item);
        }
      });
      this.props.updateFields(newFields);
    });
  }

  render() { 
    const statisticOptions = this.props.statisticOptions.concat(['user name', 'first name', 'last name']);
    let nestedItems = statisticOptions.map((elem) => {
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
        onClick={() => this.handleTap(elem)}
        primaryTogglesNestedList
        // nestedItems={this.getNestedItems(statisticOptions[elem], elem)}
      />);
    });

    return (
      <div className={styles.container}>
        <div />
        <div>
          <MuiThemeProvider>
            <List>
              <ListItem
                primaryText="Fields Filter"
                key={1}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={nestedItems}
                nestedListStyle={{ height: '400px', overflowY: 'scroll', border: '1px solid #E5E5E5', backgroundColor: '#fff' }}
                style={{backgroundColor: '#E5E5E5'}}
              />
            </List>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  statisticOptions: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default Filter;
