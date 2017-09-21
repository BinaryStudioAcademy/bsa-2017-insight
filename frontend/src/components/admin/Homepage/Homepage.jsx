import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import UserInfoTable from '../Table/Table';
import StatisticsFilter from '../StatisticsFilter/StatisticsFilter';

class Homepage extends React.Component {
  render() {
    return (
      <div style={{
        height: `calc(100vh - ${this.props.headerHeight + 18}px)`,
        overflowY: 'scroll',
      }}
      >
        <div className={styles.accordion}>
          <h4
            className={styles['filter-title']}
          >Statistics Filter
          </h4>
          <StatisticsFilter
            chosenTheme={this.props.chosenTheme}
          />
        </div>
        <UserInfoTable
          options={this.props.fieldsToDisplay}
          statistics={this.props.statistics}
          chosenTheme={this.props.chosenTheme}
          statisticOptions={this.props.statisticOptions}
          updateFields={this.props.updateFields}
        />
      </div>
    );
  }
}

Homepage.propTypes = {
  statistics: PropTypes.arrayOf(PropTypes.object),
  chosenTheme: PropTypes.shape({}),
  fieldsToDisplay: PropTypes.arrayOf(PropTypes.string),
  statisticOptions: PropTypes.arrayOf(PropTypes.string),
  updateFields: PropTypes.func,
};

export default Homepage;
