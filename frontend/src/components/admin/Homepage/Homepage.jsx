import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import UserInfoTable from '../Table/Table';
import StatisticsFilter from '../StatisticsFilter/StatisticsFilter';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statisticsFilterOpened: true,
      usersFilterOpened: false,

    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({
      statisticsFilterOpened: !this.state.statisticsFilterOpened,
      usersFilterOpened: !this.state.usersFilterOpened,
    });
  }


  render() {
    return (
      <div>
        <div className={styles.accordion}>
          <h4
            className={styles['filter-title']}
            onClick={() => this.handleOpen()}
          >Users Filter</h4>
          { (!this.state.statisticsFilterOpened) ? null
            : <StatisticsFilter
              chosenTheme={this.props.chosenTheme}
            />
          }
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
