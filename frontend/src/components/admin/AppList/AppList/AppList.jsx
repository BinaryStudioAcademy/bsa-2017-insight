import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { getAllApps, getSingleApp } from '../../../../actions/appActions';

class AppList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.props.getAppList();
  }

  render() {
    return (
      <List
        style={{
          width: '20%',
          height: `calc(100vh - ${this.props.headerHeight + 16}px)`,
          overflowY: 'scroll',
        }}
      >
        <Subheader>Apps</Subheader>
        {this.props.appList.map((app) => {
          return (
            <ListItem
              key={app._id}
              primaryText={app.name}
              onClick={() => {
                this.props.getSingleApp(app._id);
              }}
            />
          );
        })}
      </List>
    );
  }
}

AppList.propTypes = {
  getSingleApp: PropTypes.func,
  appList: PropTypes.arrayOf(PropTypes.object),
  headerHeight: PropTypes.number,
  getAppList: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    appList: state.app.apps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppList: () => {
      return dispatch(getAllApps());
    },
    getSingleApp: (id) => {
      return dispatch(getSingleApp(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
