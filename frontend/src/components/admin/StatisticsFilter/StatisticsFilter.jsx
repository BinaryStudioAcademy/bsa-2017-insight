import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
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
      const obj = {};
      keys.forEach((key) => {
        if (key !== name) obj[key] = false;
      });
      this.setState((prevState) => {
        console.log('prevState:', prevState);
        console.log('obj:', obj);
        console.log('property to change:', name);
        return { ...prevState, ...obj, [name]: !prevState[name] };
      });
    } else {
      const keys = Object.keys(this.state).filter(key => key !== name && key.includes(name));
      const obj = {};
      keys.forEach((key) => {
        obj[key] = false;
      });
      this.setState((prevState) => {
        console.log('prevState:', prevState);
        console.log('obj:', obj);
        console.log('property to change:', name);
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
    console.log('STAAAAAAATEEEEEEEZZZZZ:', this.state);
    return (
      <div className={styles['filter-wrapper']}>
        <h3 className={styles['filter-title']}>Filter users</h3>
        <form className={styles['filter-form']} onSubmit={this.onFormSubmit}>
          <CustomInput
            type="single"
            text="Username: "
            matching="username"
            class="one-row"
            displayChildren={this.state.username}
            onCustomInputClick={this.onCustomInputClick}
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
          />

          <CustomInput
            type="multiple"
            id="currentUrl"
            text="Current URL: "
            matching="currentUrl"
            onInputChange={this.onInputChange}
            onUnmount={this.onInputUnmount}
            onCustomInputClick={this.onCustomInputClick}
            displayChildren={this.state.currentUrl}
            childs={[
              { text: 'Exact :',
                matching: 'currentUrl-exact',
                displayChildren: this.state['currentUrl-exact'],
              }, {
                text: 'Includes :',
                matching: 'currentUrl-includes',
                displayChildren: this.state['currentUrl-includes'],
              }]}
          />


          {/*<CustomInput*/}
          {/*type="checkbox"*/}
          {/*id="currentUrl"*/}
          {/*text="Current URL: "*/}
          {/*matching="currentUrl"*/}
          {/*onCustomInputClick={this.onCustomInputClick}*/}
          {/*>*/}
          {/*{this.state.currentUrl &&*/}
          {/*<div className="second-block">*/}
          {/*<CustomInput*/}
          {/*type="radio"*/}
          {/*name="currentUrl"*/}
          {/*class="one-row"*/}
          {/*matching="currentUrl-exact"*/}
          {/*text="Exact: "*/}
          {/*onUnmount={this.onInputUnmount}*/}
          {/*onCustomInputClick={this.onCustomInputClick}*/}
          {/*>*/}
          {/*{this.state['currentUrl-exact'] &&*/}
          {/*<CustomInput matching="currentUrl-exact" class="text" type="text" onInputChange={this.onInputChange} />}*/}
          {/*</CustomInput>*/}
          {/*<CustomInput*/}
          {/*type="radio"*/}
          {/*name="currentUrl"*/}
          {/*class="one-row"*/}
          {/*matching="currentUrl-includes"*/}
          {/*text="Includes: "*/}
          {/*onUnmount={this.onInputUnmount}*/}
          {/*onCustomInputClick={this.onCustomInputClick}*/}
          {/*>*/}
          {/*{this.state['currentUrl-includes'] &&*/}
          {/*<CustomInput*/}
          {/*matching="currentUrl-includes"*/}
          {/*class="text"*/}
          {/*type="text"*/}
          {/*onInputChange={this.onInputChange}*/}
          {/*/>}*/}
          {/*</CustomInput>*/}
          {/*</div>}*/}
          {/*</CustomInput>*/}
          <CustomInput
            type="checkbox"
            id="browserLanguage"
            text="Browser Language: "
            matching="browserLanguage"
            class="one-row"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.browserLanguage &&
            <CustomInput
              matching="browserLanguage"
              class="text"
              type="text"
              onInputChange={this.onInputChange}
              onUnmount={this.onInputUnmount}
            />}
          </CustomInput>
          <CustomInput
            type="checkbox"
            id="country"
            text="Country: "
            matching="country"
            class="one-row"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.country &&
            <CustomInput
              matching="country"
              class="text"
              type="text"
              onInputChange={this.onInputChange}
              onUnmount={this.onInputUnmount}
            />}
          </CustomInput>
          <CustomInput
            type="checkbox"
            id="city"
            text="City: "
            matching="city"
            class="one-row"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.city &&
            <CustomInput
              matching="city"
              class="text"
              type="text"
              onInputChange={this.onInputChange}
              onUnmount={this.onInputUnmount}
            />}
          </CustomInput>
          <CustomInput
            type="checkbox"
            id="screenWidth"
            text="Screen Width: "
            matching="screenWidth"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.screenWidth &&
            <div className="second-block">
              <CustomInput
                type="radio"
                name="screenWidth"
                class="one-row"
                matching="screenWidth-exact"
                text="Exact: "
                onUnmount={this.onInputUnmount}
                onCustomInputClick={this.onCustomInputClick}
              >
                {this.state['screenWidth-exact'] &&
                <CustomInput
                  matching="screenWidth-exact"
                  class="text"
                  type="text"
                  onInputChange={this.onInputChange}
                />}
              </CustomInput>
              <CustomInput
                type="radio"
                name="screenWidth"
                class="one-row"
                matching="screenWidth-lowerThan"
                text="Lower than: "
                onUnmount={this.onInputUnmount}
                onCustomInputClick={this.onCustomInputClick}
              >
                {this.state['screenWidth-lowerThan'] &&
                <CustomInput
                  matching="screenWidth-lowerThan"
                  class="text"
                  type="text"
                  onInputChange={this.onInputChange}
                />}
              </CustomInput>
              <CustomInput
                type="radio"
                name="screenWidth"
                class="one-row"
                matching="screenWidth-greaterThan"
                text="Greater than: "
                onUnmount={this.onInputUnmount}
                onCustomInputClick={this.onCustomInputClick}
              >
                {this.state['screenWidth-greaterThan'] &&
                <CustomInput
                  matching="screenWidth-greaterThan"
                  class="text"
                  type="text"
                  onInputChange={this.onInputChange}
                />}
              </CustomInput>
            </div>
            }
          </CustomInput>
          <CustomInput
            type="checkbox"
            id="screenHeight"
            text="Screen Height: "
            matching="screenHeight"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.screenHeight &&
            <div className="second-block">
              <CustomInput
                type="radio"
                name="screenHeight"
                class="one-row"
                matching="screenHeight-exact"
                text="Exact: "
                onUnmount={this.onInputUnmount}
                onCustomInputClick={this.onCustomInputClick}
              >
                {this.state['screenHeight-exact'] &&
                <CustomInput
                  matching="screenHeight-exact"
                  class="text"
                  type="text"
                  onInputChange={this.onInputChange}
                />}
              </CustomInput>
              <CustomInput
                type="radio"
                name="screenHeight"
                class="one-row"
                matching="screenHeight-lowerThan"
                text="Lower than: "
                onUnmount={this.onInputUnmount}
                onCustomInputClick={this.onCustomInputClick}
              >
                {this.state['screenHeight-lowerThan'] &&
                <CustomInput
                  matching="screenHeight-lowerThan"
                  class="text"
                  type="text"
                  onInputChange={this.onInputChange}
                />}
              </CustomInput>
              <CustomInput
                type="radio"
                name="screenHeight"
                class="one-row"
                matching="screenHeight-greaterThan"
                text="Greater than: "
                onUnmount={this.onInputUnmount}
                onCustomInputClick={this.onCustomInputClick}
              >
                {this.state['screenHeight-greaterThan'] &&
                <CustomInput
                  matching="screenHeight-greaterThan"
                  class="text"
                  type="text"
                  onInputChange={this.onInputChange}
                />}
              </CustomInput>
            </div>
            }
          </CustomInput>
          <CustomInput
            type="checkbox"
            id="timeZone"
            text="Time Zone: "
            matching="timeZone"
            class="one-row"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.timeZone &&
            <CustomInput
              matching="timeZone"
              class="text"
              type="text"
              onInputChange={this.onInputChange}
              onUnmount={this.onInputUnmount}
            />}
          </CustomInput>
          <CustomInput
            type="checkbox"
            id="browser"
            text="Browser: "
            matching="browser"
            class="one-row"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.browser &&
            <CustomInput
              matching="browser"
              class="text"
              type="text"
              onInputChange={this.onInputChange}
              onUnmount={this.onInputUnmount}
            />}
          </CustomInput>
          <CustomInput
            type="checkbox"
            id="os"
            text="Operation System: "
            matching="os"
            class="one-row"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.os &&
            <CustomInput
              matching="os"
              class="text"
              type="text"
              onInputChange={this.onInputChange}
              onUnmount={this.onInputUnmount}
            />}
          </CustomInput>
          <CustomInput
            type="select"
            id="deviceType"
            text="Device Type: "
            matching="deviceType"
            class="one-row"
            options={['desktop', 'tablet', 'mobile']}
            displayChildren={this.state.deviceType}
            onUnmount={this.onInputUnmount}
            onInputChange={this.onInputChange}
            onCustomInputClick={this.onCustomInputClick}
          />
          <CustomInput
            type="checkbox"
            id="viewedUrls"
            text="Viewed URLs: "
            matching="viewedUrls"
            onCustomInputClick={this.onCustomInputClick}
          >
            {this.state.viewedUrls &&
            <div className="second-block">
              <CustomInput
                type="radio"
                name="viewedUrls"
                class="one-row"
                matching="viewedUrls-exact"
                text="Exact: "
                onUnmount={this.onInputUnmount}
                onCustomInputClick={this.onCustomInputClick}
              >
                {this.state['viewedUrls-exact'] &&
                <CustomInput matching="viewedUrls-exact" class="text" type="text" onInputChange={this.onInputChange} />}
              </CustomInput>
              <CustomInput
                type="radio"
                name="viewedUrls"
                class="one-row"
                matching="viewedUrls-includes"
                text="Includes: "
                onUnmount={this.onInputUnmount}
                onCustomInputClick={this.onCustomInputClick}
              >
                {this.state['viewedUrls-includes'] &&
                <CustomInput
                  matching="viewedUrls-includes"
                  class="text"
                  type="text"
                  onInputChange={this.onInputChange}
                />}
              </CustomInput>
            </div>}
          </CustomInput>
          <button type="submit" className={styles['submit-button']}>Find</button>
        </form>
      </div>
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
