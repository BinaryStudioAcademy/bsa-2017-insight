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
      	browser: { status: false, alias: 'Browser' },
      	browserLanguage: { status: false, alias: 'Browser Language' },
      	browserVersion: { status: false, alias: 'Browser Version' },
      	city: { status: false, alias: 'City' },
      	coordinates: { status: false, alias: 'Coordinates' },
      	country: { status: false, alias: 'Country' },
      	currentUrl: { status: false, alias: 'Current URL' },
      	deviceType: { status: false, alias: 'Device Type' },
      	geoLocation: { status: false, alias: 'Geolocation' },
        _id: { status: false, alias: 'ID' },
        online: { status: false, alias: 'Online' },
        os: { status: false, alias: 'OS' },
        screenHeight: { status: false, alias: 'Screen Height' },
        screenWidth: { status: false, alias: 'Screen Width' },
        timeZone: { status: false, alias: 'Timezone' },
    	userAgent: { status: false, alias: 'User Agent' },
        userId: { status: false, alias: 'User ID' }, 
        userIpAddress: { status: false, alias: 'IP Address' },
        viewedUrls: { status: false, alias: 'Viewed URLs' }
      },
    };
    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.handleTap = this.handleTap.bind(this);
  }

  componentWillMount() {
    this.props.selectedFields.forEach((option) => {
        this.state.checkedCheckboxes[option].status = true;
    });
  }

  onChangeRadio(value, groupName) {
    const newRadioValue = this.state.radioValue;
    newRadioValue[groupName] = value;
    this.setState({ radioValue: newRadioValue });
  }

  // getNestedItems(obj, groupName) {
  //   const nested = [];
  //   for (const elem in obj) {
  //     for (const elemKey in obj[elem]) {
  //       nested.push(
  //         <ListItem
  //           style={{ fontSize: '14px' }}
  //           key={elemKey}
  //           primaryText={elemKey}
  //           initiallyOpen={false}
  //           primaryTogglesNestedList
  //           rightIcon={<EmptyPlace />}
  //           leftCheckbox={
  //             <Checkbox
  //               onCheck={() => this.onChangeRadio(elemKey, groupName)}
  //               checked={this.state.radioValue[groupName] === elemKey}
  //               checkedIcon={<RadioChecked />}
  //               uncheckedIcon={<RadioUnchecked />}
  //             />
  //           }
  //           nestedItems={[
  //             <ListItem key={obj[elem][elemKey]}>
  //               <input type="text" style={{ width: '70px', marginRight: '10px' }} />
  //               <p style={{ fontSize: '14px', display: 'inline-block' }}>{obj[elem][elemKey]}</p>
  //             </ListItem>
  //           ]}
  //         />);
  //     }
  //   }
  //   return nested;
  // }

  handleTap(groupName) {
    const newInitiallyOpen = this.state.initiallyOpen;
    newInitiallyOpen[groupName] = (!newInitiallyOpen[groupName]);
    this.setState({ initiallyOpen: newInitiallyOpen });
  }

  handleCheck(checkBoxName) {
    const checkedFields = this.state.checkedCheckboxes;
    checkedFields[checkBoxName].status = (!checkedFields[checkBoxName].status);
    this.setState({ checkedCheckboxes: checkedFields }, () => {
      const newFields = [];
      Object.keys(this.state.checkedCheckboxes).forEach((item) => {
        if (this.state.checkedCheckboxes[item].status === true) {
          newFields.push(item);
        }
      });
      this.props.updateFields(newFields);
    });
  }

  render() {
    let nestedItems = Object.keys(this.state.checkedCheckboxes).map((elem) => {
      return (<ListItem
        style={{ fontSize: '14px', width: '160px'}}
        innerDivStyle={{width: '160px', padding: '16px 0 16px 38px'}}
        leftCheckbox={
          <Checkbox
            onCheck={() => this.handleCheck(elem)}
            checked={this.state.checkedCheckboxes[elem].status}
            style={{left: '3%'}}
          />}
        primaryText={this.state.checkedCheckboxes[elem].alias}
        key={uniqueId++}
        rightIcon={<EmptyPlace />}
        initiallyOpen={this.state.initiallyOpen[elem]}
        onClick={() => this.handleTap(elem)}
        primaryTogglesNestedList
        // nestedItems={this.getNestedItems(statisticOptions[elem], elem)}
      />);
    });

    return (
        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', height: '300px'}}>
        	{nestedItems}
        </div>
    );
  }
}

Filter.propTypes = {
  statisticOptions: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default Filter;
