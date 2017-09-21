import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import styles from './styles.scss'

class AdminList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      verified: null,
      canModerate: null,
      responseStatus: null,
      dataChange: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.handleModerate = this.handleModerate.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.setState({ verified: this.props.verified, canModerate: this.props.moderator });
  }

  componentWillUpdate(nextProps, nextState) {
    this.prepareHandler(() => {
      if (nextState.verified !== this.state.verified || nextState.canModerate !== this.state.canModerate) {
        this.setState({ dataChange: true });
      }
    });
  }
  handleExpandChange(expanded) {
    this.setState({ expanded });
  }

  handleToggle(event, toggle) {
    this.setState({ expanded: toggle });
  }

  handleExpand() {
    this.setState({ expanded: true });
  }

  handleReduce() {
    this.setState({ expanded: false });
  }

  handleVerify(e) {
    this.setState({ verified: e.checked });
  }

  handleModerate(e) {
    this.setState({ canModerate: e.checked });
  }

  prepareHandler(cb) {
    cb();
  }

  save() {
    const id = this.props._id;
    fetch(`${window._injectedData.insightHost}/api/admins/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ verified: this.state.verified, moderator: this.state.canModerate }),
      credentials: 'include',
    }).then((response) => {
      if (response.status === 200) return response.json();
      return null;
    }).then((response) => {
      if (response) {
        this.setState({ responseStatus: true });
      }
    });
  }

  render() {
    const usersProfile = this.props._id === window._injectedData._id ? 'You' : null;
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.username}
          subtitle={usersProfile}
          avatar={`${window._injectedData.insightHost}/uploads/avatars/${this.props.avatar}`}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <div className={styles.admininfo}>First Name: <span>{this.props.firstName}</span></div>
          <div className={styles.admininfo}>Last Name: <span>{this.props.lastName}</span> </div>
          <div className={styles.admininfo}>Email: <span>{this.props.email}</span></div>
          {this.props.access && window._injectedData.isSuperUser ? <div className={styles.controlls}>Can moderate{
            <Toggle
              disabled={this.props.isSuperUser || !this.props.access || usersProfile}
              defaultToggled={!!this.props.isSuperUser || !!this.state.canModerate}
              style={{ maxWidth: 250 }}
              onClick={e => this.handleModerate(e.target)}
            />
          }</div> : null}
          <div className={styles.controlls}> Verified
            <Toggle
              disabled={this.props.isSuperUser || usersProfile || !this.props.access}
              defaultToggled={!!this.state.verified}
              style={{ maxWidth: 250 }}
              onClick={e => this.handleVerify(e.target)}
            />
          </div>
        </CardText>
        <CardActions expandable>
          {usersProfile || this.props.access ?
            <RaisedButton
              disabled={(!usersProfile && !this.props.access) || !this.state.dataChange}
              label="Save"
              onClick={this.save}
              primary
            /> : null
          }
          <span className={styles.success}>{this.state.responseStatus === true ? 'Changes have been saved successfully!' : null}</span>
        </CardActions>
      </Card>
    );
  }
}

AdminList.propTypes = {
  verified: PropTypes.bool,
  moderator: PropTypes.bool,
  _id: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  access: PropTypes.bool,
  isSuperUser: PropTypes.bool,
};

export default AdminList;
