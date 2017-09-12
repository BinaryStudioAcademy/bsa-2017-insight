import React from 'react';
import PropTypes from 'prop-types';
import EngageSelections from './EngageSelections/EngageSelections';

class Engage extends React.Component {
  render() {
    return (
      <EngageSelections
        headerHeight={this.props.headerHeight}
        chosenTheme={this.props.chosenTheme}
      />
    );
  }
}

Engage.propTypes = {
  headerHeight: PropTypes.number,
  chosenTheme: PropTypes.shape({}),
};

export default Engage;
