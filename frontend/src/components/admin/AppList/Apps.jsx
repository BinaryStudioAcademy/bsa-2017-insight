import React from 'react';
import PropTypes from 'prop-types';
import AppList from './AppList/AppList';
import SingleApp from './SingleApp/SingleApp';

class Apps extends React.Component {
  render() {
    return (
      <div style={{
        height: `calc(100vh - ${this.props.headerHeight + 61}px)`,
        overflow: 'hidden',
        display: 'flex',
      }}
      >
        <AppList headerHeight={this.props.headerHeight} chosenTheme={this.props.chosenTheme} />
        <SingleApp headerHeight={this.props.headerHeight} chosenTheme={this.props.chosenTheme} />
      </div>
    );
  }
}

Apps.propTypes = {
  headerHeight: PropTypes.number,
  chosenTheme: PropTypes.shape({}),
};

export default Apps;
