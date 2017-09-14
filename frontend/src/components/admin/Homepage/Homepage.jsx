import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import UserInfoTable from '../Table/Table';
import ColumnsFilter from '../ColumnsFilter/ColumnsFilter';
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

  handleOpen(){
    this.setState({
      statisticsFilterOpened: !this.state.statisticsFilterOpened,
      usersFilterOpened: !this.state.usersFilterOpened,
    })
  }


  render() {
    return (
      <div>
        <div className={styles.accordion}>
          <h4
            className={styles['filter-title']}
            onClick={() => this.handleOpen()}
          >Users Filter</h4>
          { (!this.state.statisticsFilterOpened) ? null :
              <StatisticsFilter 
                chosenTheme={this.props.chosenTheme}
              />
            }

          <h4
            className={styles['filter-title']}
            onClick={() => this.handleOpen()}
          >Columns Filter</h4>
          { (!this.state.usersFilterOpened) ? null :
            <ColumnsFilter
              updateFields={this.props.updateFields}
              statisticOptions={this.props.statisticOptions}
              selectedFields={this.props.fieldsToDisplay}
              chosenTheme={this.props.chosenTheme}
            />
          }
        </div>
        <UserInfoTable
          options={this.props.fieldsToDisplay}
          statistics={this.props.statistics}
          chosenTheme={this.props.chosenTheme}
        />
      </div>
    );
  }
}

export default Homepage;