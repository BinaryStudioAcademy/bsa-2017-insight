import React from 'react';
import PropTypes from 'prop-types';
import SelectionList from './SelectionList/SelectionList';
import Selection from './Selection/Selection';

class EngageSelections extends React.Component {
  render() {
    return (
      <div style={{
        height: `calc(100vh - ${this.props.headerHeight + 61}px)`,
        overflow: 'hidden',
        display: 'flex',
      }}
      >
        <SelectionList headerHeight={this.props.headerHeight} chosenTheme={this.props.chosenTheme} />
        <Selection headerHeight={this.props.headerHeight} chosenTheme={this.props.chosenTheme} />
      </div>
    );
  }
}

EngageSelections.propTypes = {
  headerHeight: PropTypes.number,
  chosenTheme: PropTypes.shape({}),
};

export default EngageSelections;