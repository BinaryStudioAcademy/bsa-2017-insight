import React from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import propTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles.scss';
import CustomInput from './CustomInput/CustomInput';
import { setStatisticsFilter, getAllStatistics } from './../../../actions/statisticActions';

class StatisticsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: false,
      currentUrl: false,
      'currentUrl-exact': false,
      'currentUrl-includes': false,
      browserLanguage: false,
      country: false,
      city: false,
      screenWidth: false,
      'screenWidth-exact': false,
      'screenWidth-lowerThan': false,
      'screenWidth-greaterThan': false,
      screenHeight: false,
      'screenHeight-exact': false,
      'screenHeight-lowerThan': false,
      'screenHeight-greaterThan': false,
      userIpAddress: false,
      timeZone: false,
      browser: false,
      os: false,
      deviceType: false,
      viewedUrls: false,
      'viewedUrls-exact': false,
      'viewedUrls-includes': false,
    };
    this.onCustomInputClick = this.onCustomInputClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputUnmount = this.onInputUnmount.bind(this);
  }

  onInputChange(property, value) {
    if (value.includes(' ')) return;
    const propertyName = property.includes('-') ? property.split('-')[0] : property;
    let queryString = `${propertyName}=`;
    if (!property.includes('-') || property.split('-')[1] === 'exact') {
      queryString += '*HAS*';
      if (value.includes(',')) {
        queryString = '';
        value.split(',').forEach((word, i, arr) => {
          queryString += word;
          if (i !== arr.length - 1) queryString += '*OR*';
        });
      } else {
        queryString += value;
      }
    }
    if (property.includes('-lowerThan')) {
      queryString += `*MAX*${value}`;
    }
    if (property.includes('-greaterThan')) {
      queryString += `*MIN*${value}`;
    }
    if (property.includes('-includes')) {
      queryString += `*INCLUDES*${value}`;
    }
    if (value === '') queryString = '';
    this.props.dispatch(setStatisticsFilter({ [propertyName]: queryString }));
  }

  onInputUnmount(property) {
    const propertyName = property.split('-')[0];
    this.props.dispatch(setStatisticsFilter({ [propertyName]: '' }));
  }

  onCustomInputClick(name) {
    if (name.includes('-')) {
      const property = name.split('-')[0];
      const keys = Object.keys(this.state).filter(key => key !== property && key.includes(property));
      const stateObj = {};
      keys.forEach((key) => {
        if (key !== name) {
          stateObj[key] = false;
        }
      });
      this.props.dispatch(setStatisticsFilter({ [property]: '' }));
      this.setState((prevState) => {
        return { ...prevState, ...stateObj, [name]: !prevState[name] };
      });
    } else {
      const keys = Object.keys(this.state).filter(key => key !== name && key.includes(name));
      const obj = {};
      keys.forEach((key) => {
        obj[key] = false;
      });
      this.setState((prevState) => {
        return { ...prevState, ...obj, [name]: !prevState[name] };
      });
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    const queryObj = this.props.activeFilters;
    let queryString = '';
    Object.keys(queryObj).forEach((property, i, arr) => {
      if (queryObj[property] !== '') {
        queryString += `${property}=${queryObj[property]}${i !== arr.length - 1 ? '&' : ''}`;
      }
    });
    this.props.dispatch(getAllStatistics(queryString));
  }

  render() {
    return (
      <List className={styles['filter-wrapper']} style={{padding: 0, border: '1px solid #4DD0E1', overflow: 'hidden', marginLeft: '13px'}}>
        <h4 className={styles['filter-title']} style={{ backgroundColor: '#4DD0E1', margin: 0, height: '48px', lineHeight: '48px'}}>Users Filter</h4>
        <form className={styles['filter-form']} onSubmit={this.onFormSubmit}>
          <CustomInput
            type="single"
            text="Username:"
            matching="username"
            displayChildren={this.state.username}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />
          <CustomInput
            type="multiple"
            text="Current URL:"
            matching="currentUrl"
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
            onCustomInputClick={this.onCustomInputClick}
            displayChildren={this.state.currentUrl}
            childs={[
              {
                text: 'Exact :',
                matching: 'currentUrl-exact',
                displayChildren: this.state['currentUrl-exact'],
              }, {
                text: 'Includes :',
                matching: 'currentUrl-includes',
                displayChildren: this.state['currentUrl-includes'],
              }]}
          />
          <CustomInput
            type="single"
            text="Browser Language:"
            matching="browserLanguage"
            displayChildren={this.state.browserLanguage}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />
          <CustomInput
            type="single"
            text="Country:"
            matching="country"
            displayChildren={this.state.country}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />
          <CustomInput
            type="single"
            text="City:"
            matching="city"
            displayChildren={this.state.city}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />
          <CustomInput
            type="multiple"
            text="Screen Width:"
            matching="screenWidth"
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
            onCustomInputClick={this.onCustomInputClick}
            displayChildren={this.state.screenWidth}
            childs={[
              {
                text: 'Exact :',
                matching: 'screenWidth-exact',
                displayChildren: this.state['screenWidth-exact'],
              }, {
                text: 'Lower than :',
                matching: 'screenWidth-lowerThan',
                displayChildren: this.state['screenWidth-lowerThan'],
              }, {
                text: 'Greater than :',
                matching: 'screenWidth-greaterThan',
                displayChildren: this.state['screenWidth-greaterThan'],
              }]}
          />
          <CustomInput
            type="multiple"
            text="Screen Height:"
            matching="screenHeight"
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
            onCustomInputClick={this.onCustomInputClick}
            displayChildren={this.state.screenHeight}
            childs={[
              {
                text: 'Exact :',
                matching: 'screenHeight-exact',
                displayChildren: this.state['screenHeight-exact'],
              }, {
                text: 'Lower than :',
                matching: 'screenHeight-lowerThan',
                displayChildren: this.state['screenHeight-lowerThan'],
              }, {
                text: 'Greater than :',
                matching: 'screenHeight-greaterThan',
                displayChildren: this.state['screenHeight-greaterThan'],
              }]}
          />
          <CustomInput
            type="single"
            text="User IP:"
            matching="userIpAddress"
            displayChildren={this.state.userIpAddress}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />
          <CustomInput
            type="single"
            text="Time Zone:"
            matching="timeZone"
            displayChildren={this.state.timeZone}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />
          <CustomInput
            type="single"
            text="Browser:"
            matching="browser"
            displayChildren={this.state.browser}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />
          <CustomInput
            type="single"
            text="Operation System:"
            matching="os"
            displayChildren={this.state.os}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />
          <CustomInput
            type="select"
            id="deviceType"
            text="Device Type: "
            matching="deviceType"
            options={['desktop', 'tablet', 'mobile']}
            displayChildren={this.state.deviceType}
            onUnmount={this.onInputUnmount}
            onInputChange={this.onInputChange}
            onCustomInputClick={this.onCustomInputClick}
          />

          <CustomInput
            type="multiple"
            text="Viewed URLs:"
            matching="viewedUrls"
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
            onCustomInputClick={this.onCustomInputClick}
            displayChildren={this.state.viewedUrls}
            childs={[
              {
                text: 'Exact :',
                matching: 'viewedUrls-exact',
                displayChildren: this.state['viewedUrls-exact'],
              }, {
                text: 'Includes :',
                matching: 'viewedUrls-includes',
                displayChildren: this.state['viewedUrls-includes'],
              }]}
          />
          <RaisedButton type="submit" label="Search" primary={true} className={styles['submit-button']} />
        </form>
      </List>
    );
  }
}

StatisticsFilter.propTypes = {
  dispatch: propTypes.func.isRequired,
  activeFilters: propTypes.shape({
    username: propTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeFilters: state.statistics.activeStatisticsFilters,
  };
};


export default connect(mapStateToProps)(StatisticsFilter);
