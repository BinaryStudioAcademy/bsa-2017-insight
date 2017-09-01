import React from 'react';
import PropTypes from 'prop-types';
import UserInfoTable from './../Table/Table';
import Filter from './../Filter/Filter';
import StatisticsFilter from './../StatisticsFilter/StatisticsFilter';
import StatisticsCharts from './../StatisticsCharts/StatisticsCharts';

class AdminHome extends React.Component {
  getStatisticOptions(arr) {
    let options = [];
    if (typeof (arr[0]) === 'object') {
      options = Object.keys(arr[0]);
    }
    return options;
  }

  render() {
    const statistics = this.props.usersToRender;
    const options = this.getStatisticOptions(this.props.usersToRender);
    return (
      <div>
        <div style={{
          position: 'relative',
          height: '64px',
          zIndex: 1000,
        }}
        >
          <Filter
            selectedFields={this.props.fieldsToDisplay}
            statisticOptions={options}
            updateFields={this.props.updateFields}
          />
        </div>
        <StatisticsFilter />
        <UserInfoTable
          options={this.props.fieldsToDisplay}
          statistics={statistics}
        />
        <StatisticsCharts
          selectedFields={this.props.fieldsToDisplay}
          statistics={statistics}
        />
      </div>
    );
  }
}

AdminHome.propTypes = {
  fieldsToDisplay: PropTypes.arrayOf(PropTypes.object),
  updateFields: PropTypes.arrayOf(PropTypes.object),
  usersToRender: PropTypes.arrayOf(PropTypes.object),
};

export default AdminHome;
