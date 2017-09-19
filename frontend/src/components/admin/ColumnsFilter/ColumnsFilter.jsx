import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../Filter/Filter';

class ColumnsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
    this.expandList = this.expandList.bind(this);
  }

  expandList() {
    this.setState({
      opened: !this.state.opened,
    });
  }

  render() {
    return (
      <Filter
        selectedFields={this.props.selectedFields}
        statisticOptions={this.props.statisticOptions}
        updateFields={this.props.updateFields}
      />
    );
  }
}

ColumnsFilter.propTypes = {
  selectedFields: PropTypes.arrayOf(PropTypes.string),
  statisticOptions: PropTypes.arrayOf(PropTypes.string),
  updateFields: PropTypes.func,
};

export default ColumnsFilter;
