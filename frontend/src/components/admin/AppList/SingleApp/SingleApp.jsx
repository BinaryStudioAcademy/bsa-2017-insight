import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import { toggleApp, getSingleApp } from '../../../../actions/appActions';

class SingleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenApp: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chosenApp !== this.state.chosenApp) {
      // this.props.getSingleApp(nextProps.chosenApp);
      this.setState({ chosenApp: nextProps.chosenApp });
    }
    console.log(this.props.chosenApp);
  }

  render() {
    return (
      <div style={{
        height: `calc(100vh - ${this.props.headerHeight + 61}px)`,
        overflowY: 'scroll',
        flexGrow: '1',
        padding: '20px',
      }}
      >
        { this.state.chosenApp ?
          <Card
            containerStyle={{
              backgroundColor: this.props.chosenTheme.palette.borderColor,
              padding: 10,
            }}
          >
            <CardHeader
              title={this.props.chosenApp.name}
              titleStyle={{ fontSize: 20 }}
              subtitle={this.props.chosenApp.url}
            />
            { this.props.chosenApp.generalAdmin &&
              <CardHeader
                title={this.props.chosenApp.generalAdmin.firstName + ' '
                + this.props.chosenApp.generalAdmin.lastName + ' @ '
                + this.props.chosenApp.generalAdmin.username}
                subtitle={this.props.chosenApp.generalAdmin.email}
                avatar={`${window._injectedData.insightHost}/uploads/avatars/${this.props.chosenApp.generalAdmin.avatar}`}
              />
            }
            <CardActions>
              <Toggle
                label={`App is ${this.props.chosenApp.isActive ? 'working' : 'disabled'}`}
                style={{ width: 200 }}
                toggled={this.props.chosenApp.isActive}
                onClick={() => {
                  this.props.toggleApp(this.props.chosenApp._id);
                  this.setState({ chosenApp: this.props.chosenApp });
                }}
              />
            </CardActions>
          </Card> :
          'Choose an app first' }
      </div>
    );
  }
}

SingleApp.propTypes = {
  headerHeight: PropTypes.number,
  chosenApp: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    description: PropTypes.description,
    mailings: PropTypes.arrayOf(PropTypes.object),
    _id: PropTypes.string,
    isActive: PropTypes.bool,
    url: PropTypes.string,
  }),
  toggleApp: PropTypes.func,
  chosenTheme: PropTypes.shape({
    palette: PropTypes.shape({
      borderColor: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state) => {
  return {
    chosenApp: state.app.chosenApp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleApp: (id) => {
      return dispatch(toggleApp(id));
    },
    getSingleApp: (id) => {
      return dispatch(getSingleApp(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleApp);
