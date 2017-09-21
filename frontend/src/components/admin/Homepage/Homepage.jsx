import React from 'react';
import PropTypes from 'prop-types';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import Popover from 'material-ui/Popover/Popover';
import styles from './styles.scss';
import UserInfoTable from '../Table/Table';
import StatisticsFilter from '../StatisticsFilter/StatisticsFilter';

class Homepage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     opened: false,
  //   };
  //   this.handleHint = this.handleHint.bind(this);
  // }

  // handleHint(event) {
  //   console.log("JKHKSJAHKDJHSKJAHKS");
  //   console.log(this.state.opened);
  //   this.setState(
  //     {
  //       opened: !this.state.opened,
  //       anchorEl: event.currentTarget,
  //     });
  // }

  render() {
    return (
      <div>
        <div className={styles.accordion}>
          <h4
            className={styles['filter-title']}
          >Statistics Filter
            {/* <FilterIcon onMouseEnter={this.handleHint} >?</FilterIcon> */}
          </h4>
          <StatisticsFilter
            chosenTheme={this.props.chosenTheme}
          />
          {/* <Popover
            className={styles['hint-popover']}
            animated={false}
            open={this.state.opened}
            onRequestClose={this.handleHint}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorEl={this.state.anchorEl}
          >
            You can easily choose...
          </Popover> */}
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
